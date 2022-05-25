const scriptName = "following-overcharged";

type StacksIconButtonOptions = {
    classes?: string[];
    title?: string;
    muted?: boolean;
    type?: "outlined" | "filled";
    primary?: boolean;
    danger?: boolean;
    loading?: boolean;
};

type StacksIconOptions = {
    classes?: string[];
    hidden?: boolean;
    namespace?: string;
    width?: number;
    height?: number;
};

type UnfollowProgressPageEventDetail = {
    numAnchors: number;
    page: number;
};

type UnfollowProgressPostEventDetail = UnfollowProgressPageEventDetail & {
    postId: string;
};

/**
 * @see https://stackoverflow.design/product/components/buttons/
 *
 * @summary creates a stacks button
 * @param id id of the button
 * @param text text of the button
 * @param options configuration
 */
const makeStacksButton = (
    id: string,
    text: string,
    options: StacksIconButtonOptions = {}
) => {
    const {
        classes = [],
        title,
        danger = false,
        loading = false,
        muted = false,
        primary = false,
        type = "filled",
    } = options;

    const btn = document.createElement("button");
    btn.id = id;
    btn.textContent = text;
    btn.classList.add("s-btn", `s-btn__${type}`, ...classes);
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-label", title || text);

    if (danger) btn.classList.add("s-btn__danger");
    if (muted) btn.classList.add("s-btn__muted");
    if (primary) btn.classList.add("s-btn__primary");
    if (loading) btn.classList.add("is-loading");

    if (title) {
        btn.title = title;
    }

    return btn;
};

/**
 * @see https://stackoverflow.design/product/resources/icons/
 * @summary makes Stacks 18 x 18 icon
 * @param name icon name
 * @param pathConfig <path> string
 * @param options icon configuration
 */
const makeStacksIcon = (
    name: string,
    pathConfig: string,
    options: StacksIconOptions = {}
) => {
    const {
        classes = [],
        hidden = false,
        namespace = "http://www.w3.org/2000/svg",
        height = 18,
        width = 18
    } = options;

    const svg = document.createElementNS(namespace, "svg");
    svg.classList.add("svg-icon", name, ...classes);
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("aria-hidden", "true");

    if (hidden) svg.classList.add("d-none");

    const path = document.createElementNS(namespace, "path");
    path.setAttribute("d", pathConfig);

    svg.append(path);
    return svg;
};

/**
 * @summary creates config modal element
 * @param id of the modal
 * @param header modal header
 * @param options modal configuration
 */
const makeStacksModal = (
    id: string,
    header: string,
    options: {
        minWidth: 0 | 10 | 25 | 50 | 75 | 100;
    }
): [wrapper: HTMLElement, content: HTMLElement] => {
    const { minWidth } = options;

    const ariaLabelId = "modal-title";
    const ariaDescrId = "modal-description";

    const wrap = document.createElement("aside");
    wrap.classList.add("s-modal");
    wrap.id = id;
    wrap.tabIndex = -1;
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-labelledby", ariaLabelId);
    wrap.setAttribute("aria-describeddy", ariaDescrId);
    wrap.setAttribute("aria-hidden", "true");

    const { dataset } = wrap;
    dataset.sModalTarget = "modal";
    dataset.controller = "s-modal";

    const doc = document.createElement("div");
    doc.classList.add("s-modal--dialog", "ps-relative", "hmx6", `wmn${minWidth}`);
    doc.setAttribute("role", "document");
    doc.id = `${id}-document`;
    doc.draggable = true;

    const title = document.createElement("h1");
    title.classList.add("s-modal--header");
    title.id = ariaLabelId;
    title.textContent = header;

    const close = document.createElement("button");
    close.classList.add("s-modal--close", "s-btn", "s-btn__muted");
    close.type = "button";
    close.dataset.action = "s-modal#hide";

    const closeIcon = makeStacksIcon(
        "iconClearSm",
        "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z",
        { width: 14, height: 14 }
    );

    close.append(closeIcon);
    doc.append(title, close);
    wrap.append(doc);
    return [wrap, doc];
};

/**
 * @summary observes {@link context} for changes
 * @param selector selector to match on changes
 * @param context {@link Element} or {@link Document} to observe
 * @param callback function to call with {@link selector} match results
 */
const observe = <T extends Element>(
    selector: string,
    context: Element | Document,
    callback: (matched: T[], observer: MutationObserver) => void
): void => {
    const observerCallback: MutationCallback = (_, observer) => {
        const collection = context.querySelectorAll<T>(selector);
        if (collection.length) callback([...collection], observer);
    };

    const observer = new MutationObserver(observerCallback);

    observer.observe(context, {
        attributes: true,
        childList: true,
        subtree: true,
    });

    observerCallback([], observer);
};


/**
 * @summary delays execution
 * @param ms milliseconds to delay for
 */
const delay = (ms = 100) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * @summary normalizes property name for setting on a {@link DOMStringMap}
 * @param name property name
 */
const normalizeDatasetPropName = (name: string) => name.split("-").map(([first, ...rest], i) => {
    return `${i ? first.toUpperCase() : first.toLowerCase()}${rest.join("").toLowerCase()}`;
}).join("");

/**
 * @summary follows a given post
 * @param fkey user fkey to authenticate the request
 * @param postId id of the post to follow
 * @param signal abort signal
 */
const followPost = async (fkey: string, postId: string, signal?: AbortSignal) => {
    const url = new URL(`${location.origin}/posts/${postId}/vote/21`);

    const body = new URLSearchParams();
    body.set("fkey", fkey);

    const res = await fetch(url.toString(), {
        body,
        credentials: "include",
        method: "POST",
        signal
    });

    return res.ok;
};

/**
 * @summary unfollows a given post
 * @param fkey user fkey to authenticate the request
 * @param postId id of the post to unfollow
 * @param signal abort signal
 */
const unfollowPost = async (fkey: string, postId: string, signal: AbortSignal) => {
    const url = new URL(`${location.origin}/posts/${postId}/vote/21`);
    url.searchParams.append("undo", "true");

    const body = new URLSearchParams();
    body.set("fkey", fkey);

    const res = await fetch(url.toString(), {
        body,
        credentials: "include",
        method: "POST",
        signal
    });

    return res.ok;
};

let followCount = 0;

/**
 * @summary registers a {@link MutationObserver} for the "follow" button
 * @param selector "follow" button selector
 */
const registerFollowPostObserver = (selector: string) => {
    observe<HTMLElement>(selector, document, async (buttons, observer) => {
        if (followCount > 100) {
            console.debug(`[${scriptName}] attempted to follow >= 100 posts, disconnecting`);
            observer.disconnect();
            return;
        }

        const stateProp = normalizeDatasetPropName(`${scriptName}-state`);

        const { fkey } = StackExchange.options.user;

        for (const button of buttons) {
            if (button.dataset[stateProp] === "follow") {
                continue;
            }

            const state = button.textContent?.toLowerCase()?.trim();
            if (!state) {
                console.debug(`[${scriptName}] empty follow button found`);
                continue;
            }

            const postId = button.id.replace("btnFollowPost-", "");
            if (!+postId) {
                console.debug(`[${scriptName}] failed to get postId from follow button`);
                continue;
            }

            if (state === "follow") {
                followCount += 1;

                await followPost(fkey, postId);

                button.dataset[stateProp] = state;
                button.textContent = "Following";
            }

            // ensure we are not getting requests out too fast
            await delay(500);
        }
    });
};

/**
 * @summary unfollows all posts, paginated
 * @param page current page
 * @param signal abort signal
 */
const unfollowAllPosts = async (page: number, signal: AbortSignal): Promise<void> => {
    try {
        const { userId } = StackExchange.options.user;
        if (!userId) {
            console.debug(`[${scriptName}] missing user id`);
            return;
        }

        const url = new URL(`${location.origin}/users/${userId}`);
        const { searchParams } = url;
        searchParams.append("tab", "following");
        searchParams.append("sort", "newest");
        searchParams.append("page", page.toString());

        const res = await fetch(url.toString(), { signal });
        if (!res.ok) {
            console.debug(`[${scriptName}] failed to fetch page ${page} of followed posts`);
            return;
        }

        const $page = $(await res.text());

        const anchors = $page.find<HTMLAnchorElement>("a.s-post-summary--content-title[href*='/questions']").get();
        if (!anchors.length) {
            console.debug(`[${scriptName}] last page reached`);
            return;
        }

        const numAnchors = anchors.length;

        window.dispatchEvent(new CustomEvent<UnfollowProgressPageEventDetail>(
            "unfollow-progress-page",
            { detail: { numAnchors, page, } }
        ));

        const { fkey } = StackExchange.options.user;

        for (const anchor of anchors) {
            if (signal.aborted) {
                console.debug(`[${scriptName}] unfollowing aborted`);
                return;
            }

            // https://regex101.com/r/0KW231/2
            const [, questionId, answerId] = /\/questions\/(\d+)\/.*?(?:\/(\d+)|$)/.exec(anchor.href) || [];
            const postId = answerId || questionId;

            await unfollowPost(fkey, postId, signal);

            window.dispatchEvent(new CustomEvent<UnfollowProgressPostEventDetail>(
                "unfollow-progress-post",
                { detail: { numAnchors, page, postId, } }
            ));

            // really ensure we do not hit rate-limit
            await delay(500);
        }

        // ensure we do not hit rate-limit
        await delay(2e3 + 1);

        return unfollowAllPosts(page + 1, signal);

    } catch (error) {
        console.debug(`[${scriptName}] failed to get page ${page} of followed posts:\n${error}`);
    }
};

unsafeWindow.addEventListener("userscript-configurer-load", () => {
    const { Configurer } = unsafeWindow.UserScripters?.Userscripts || {};
    if (!Configurer) {
        console.debug(`[${scriptName}] missing userscript configurer`);
        return;
    }

    const script = Configurer.register(scriptName);

    script.option("always-follow-questions", {
        type: "toggle",
        desc: "Autofollow posts on page load",
        def: false
    });

    script.option("always-follow-answers", {
        type: "toggle",
        desc: "Autofollow answers on page load",
        def: false
    });

    script.option("reload-on-done", {
        type: "toggle",
        desc: "Reload page after unfollowing all posts",
        def: false
    });
});

window.addEventListener("load", async () => {
    const script = unsafeWindow.UserScripters?.Userscripts?.Configurer?.get(scriptName);

    if (!StackExchange.options.user.isAnonymous) {
        const alwaysFollowQuestions = await script?.load<boolean>("always-follow-questions") || false;
        if (alwaysFollowQuestions) {
            registerFollowPostObserver(".js-follow-question");
        }

        const alwaysFollowAnswers = await script?.load<boolean>("always-follow-answers") || false;
        if (alwaysFollowAnswers) {
            registerFollowPostObserver(".js-follow-answer");
        }
    }

    const search = new URLSearchParams(location.search);
    if (search.get("tab") === "following") {
        const following = document.querySelector("#user-tab-following > div:first-child");
        if (following) {
            const unfollowAllBtn = makeStacksButton(
                `${scriptName}-unfollow-all-btn`,
                "Unfollow all",
                {
                    classes: ["s-btn__xs", "flex--item", "ml8"],
                    type: "outlined"
                }
            );

            const [unfollowAllModalWrapper, unfollowAllContent] = makeStacksModal(
                `${scriptName}-unfollow-all-modal`,
                "Unfollow All Posts",
                { minWidth: 25 }
            );

            const warning = document.createElement("p");
            warning.innerHTML = `
            This will initiate an irreversible action of unfollowing <strong>all</strong> of your followed posts on the site.<br/>
            The process is intentionally throttled to avoid rate-limiting.<br/>
            If you still wish to proceed, click the "Start" button below.
            `.trim();

            const actionWrapper = document.createElement("div");
            actionWrapper.classList.add("d-flex", "ai-center", "gsx", "g12");

            const startBtn = makeStacksButton(`${scriptName}-unfollow-all-start-btn`, "Start", {
                classes: ["flex--item"],
                danger: true,
                type: "outlined"
            });

            const abortBtn = makeStacksButton(`${scriptName}-unfollow-all-abort-btn`, "Abort", {
                classes: ["flex--item"],
                type: "outlined"
            });

            const statusReportElem = document.createElement("div");
            statusReportElem.classList.add("flex--item");

            let processedOnPage = 0;
            window.addEventListener("unfollow-progress-page", (event) => {
                const { detail: { page } } = event as CustomEvent<UnfollowProgressPageEventDetail>;
                statusReportElem.textContent = `Unfollowing page ${page}`;
                processedOnPage = 0;
            });

            window.addEventListener("unfollow-progress-post", (event) => {
                processedOnPage += 1;
                const { detail: { numAnchors, page } } = event as CustomEvent<UnfollowProgressPostEventDetail>;
                statusReportElem.textContent = `Unfollowing page ${page} (${processedOnPage}/${numAnchors})`;
            });

            const ac = new AbortController();

            startBtn.addEventListener("click", async () => {
                startBtn.classList.add("is-loading");
                await unfollowAllPosts(1, ac.signal);
                startBtn.classList.remove("is-loading");
                statusReportElem.textContent = "Finished unfollowing posts";

                const shouldReload = script?.load("reload-on-done") || false;
                if (shouldReload) {
                    await delay(1e3);
                    location.reload();
                }
            });

            abortBtn.addEventListener("click", () => ac.abort());

            unfollowAllBtn.addEventListener("click", () => Stacks.showModal(unfollowAllModalWrapper));

            actionWrapper.append(startBtn, abortBtn, statusReportElem);
            unfollowAllContent.append(warning, actionWrapper);
            following.append(unfollowAllBtn);
            document.body.append(unfollowAllModalWrapper);
        }
    }

}, { once: true });