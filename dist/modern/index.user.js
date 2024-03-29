// ==UserScript==
// @name           Following Overcharged
// @author         Oleg Valter <oleg.a.valter@gmail.com>
// @description    Various improvements to the "follow" feature
// @grant          unsafeWindow
// @grant          GM_getValue
// @grant          GM_setValue
// @homepage       https://github.com/userscripters/following-overcharged#readme
// @match          https://stackoverflow.com/questions/*
// @match          https://stackoverflow.com/users/*
// @match          https://serverfault.com/questions/*
// @match          https://serverfault.com/users/*
// @match          https://superuser.com/questions/*
// @match          https://superuser.com/users/*
// @match          https://*.stackexchange.com/questions/*
// @match          https://*.stackexchange.com/users/*
// @match          https://askubuntu.com/questions/*
// @match          https://askubuntu.com/users/*
// @match          https://stackapps.com/questions/*
// @match          https://stackapps.com/users/*
// @match          https://mathoverflow.net/questions/*
// @match          https://mathoverflow.net/users/*
// @match          https://pt.stackoverflow.com/questions/*
// @match          https://pt.stackoverflow.com/users/*
// @match          https://ja.stackoverflow.com/questions/*
// @match          https://ja.stackoverflow.com/users/*
// @match          https://ru.stackoverflow.com/questions/*
// @match          https://ru.stackoverflow.com/users/*
// @match          https://es.stackoverflow.com/questions/*
// @match          https://es.stackoverflow.com/users/*
// @match          https://meta.stackoverflow.com/questions/*
// @match          https://meta.stackoverflow.com/users/*
// @match          https://meta.serverfault.com/questions/*
// @match          https://meta.serverfault.com/users/*
// @match          https://meta.superuser.com/questions/*
// @match          https://meta.superuser.com/users/*
// @match          https://meta.askubuntu.com/questions/*
// @match          https://meta.askubuntu.com/users/*
// @match          https://meta.mathoverflow.net/questions/*
// @match          https://meta.mathoverflow.net/users/*
// @match          https://pt.meta.stackoverflow.com/questions/*
// @match          https://pt.meta.stackoverflow.com/users/*
// @match          https://ja.meta.stackoverflow.com/questions/*
// @match          https://ja.meta.stackoverflow.com/users/*
// @match          https://ru.meta.stackoverflow.com/questions/*
// @match          https://ru.meta.stackoverflow.com/users/*
// @match          https://es.meta.stackoverflow.com/questions/*
// @match          https://es.meta.stackoverflow.com/users/*
// @namespace      userscripters
// @require        https://raw.githubusercontent.com/userscripters/storage/master/dist/browser.js
// @run-at         document-start
// @source         git+https://github.com/userscripters/following-overcharged.git
// @supportURL     https://github.com/userscripters/following-overcharged/issues
// @version        2.0.0
// ==/UserScript==

"use strict";
const scriptName = "following-overcharged";
const makeStacksButton = (id, text, options = {}) => {
    const { classes = [], title, danger = false, loading = false, muted = false, primary = false, type = "filled", } = options;
    const btn = document.createElement("button");
    btn.id = id;
    btn.textContent = text;
    btn.classList.add("s-btn", `s-btn__${type}`, ...classes);
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-label", title || text);
    if (danger)
        btn.classList.add("s-btn__danger");
    if (muted)
        btn.classList.add("s-btn__muted");
    if (primary)
        btn.classList.add("s-btn__primary");
    if (loading)
        btn.classList.add("is-loading");
    if (title) {
        btn.title = title;
    }
    return btn;
};
const makeStacksIcon = (name, pathConfig, options = {}) => {
    const { classes = [], hidden = false, namespace = "http://www.w3.org/2000/svg", height = 18, width = 18 } = options;
    const svg = document.createElementNS(namespace, "svg");
    svg.classList.add("svg-icon", name, ...classes);
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("aria-hidden", "true");
    if (hidden)
        svg.classList.add("d-none");
    const path = document.createElementNS(namespace, "path");
    path.setAttribute("d", pathConfig);
    svg.append(path);
    return svg;
};
const makeDraggable = (id) => {
    document.addEventListener("dragstart", ({ dataTransfer }) => {
        const dummy = document.createElement("img");
        dummy.src = "data:image/png;base64,AAAAAA==";
        dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setDragImage(dummy, 0, 0);
    });
    let previousX = 0;
    let previousY = 0;
    let zeroed = 0;
    let isDragging = false;
    const handleCoordChange = ({ clientX, clientY }) => {
        const modal = document.getElementById(id);
        if (!modal)
            return;
        previousX || (previousX = clientX);
        previousY || (previousY = clientY);
        let { style: { top, left }, } = modal;
        if (!top && !left) {
            const computed = window.getComputedStyle(modal);
            top = computed.top;
            left = computed.left;
        }
        const moveX = clientX - previousX;
        const moveY = clientY - previousY;
        const superSonic = 500;
        if ([moveX, moveY].map(Math.abs).some((c) => c > superSonic))
            return;
        const { style } = modal;
        style.left = `${parseInt(left) + moveX}px`;
        style.top = `${parseInt(top) + moveY}px`;
        previousX = clientX;
        previousY = clientY;
    };
    document.addEventListener("dragstart", (event) => {
        const { target } = event;
        if (target === document.getElementById(id))
            isDragging = true;
    });
    document.addEventListener("dragend", ({ target }) => {
        if (target === document.getElementById(id)) {
            isDragging = false;
            previousX = 0;
            previousY = 0;
        }
    });
    document.addEventListener("drag", (event) => {
        zeroed = event.clientX ? 0 : zeroed < 3 ? zeroed + 1 : 3;
        if (zeroed >= 3 || !isDragging)
            return;
        return handleCoordChange(event);
    });
    document.addEventListener("dragover", (e) => {
        if (isDragging)
            e.preventDefault();
        if (zeroed < 3 || !isDragging)
            return;
        return handleCoordChange(e);
    });
};
const makeStacksModal = (id, header, options) => {
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
    const closeIcon = makeStacksIcon("iconClearSm", "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z", { width: 14, height: 14 });
    makeDraggable(doc.id);
    close.append(closeIcon);
    doc.append(title, close);
    wrap.append(doc);
    return [wrap, doc];
};
const observe = (selector, context, callback) => {
    const observerCallback = (_, observer) => {
        const collection = context.querySelectorAll(selector);
        if (collection.length)
            callback([...collection], observer);
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(context, {
        attributes: true,
        childList: true,
        subtree: true,
    });
    observerCallback([], observer);
    return observer;
};
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
const normalizeDatasetPropName = (name) => name.split("-").map(([first, ...rest], i) => {
    return `${i ? first.toUpperCase() : first.toLowerCase()}${rest.join("").toLowerCase()}`;
}).join("");
const followPost = async (fkey, postId, signal) => {
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
const unfollowPost = async (fkey, postId, signal) => {
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
const isElementNode = (node) => {
    return node.nodeType === Node.ELEMENT_NODE;
};
const matches = (elem, selector) => {
    return elem.matches(selector);
};
const waitForAdded = (selector, context = document) => {
    return new Promise((resolve) => {
        const obs = new MutationObserver((records, observer) => {
            const added = records.flatMap((r) => [...r.addedNodes]);
            const matching = added
                .filter(isElementNode)
                .flatMap((element) => matches(element, selector) ?
                element :
                [...element.querySelectorAll(selector)]);
            if (matching.length) {
                observer.disconnect();
                resolve(matching);
            }
        });
        obs.observe(context, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    });
};
class ObserverCleaner {
    constructor() {
        this.listeners = new Map();
        this.observers = new Set();
        this.statePropName = normalizeDatasetPropName(`${scriptName}-state`);
    }
    clean() {
        const { observers, listeners, statePropName } = this;
        observers.forEach((observer) => observer.disconnect());
        listeners.forEach(([type, listener], target) => {
            target.removeEventListener(type, listener);
            delete target.dataset[statePropName];
        });
    }
    trackListener(target, type, listener) {
        this.listeners.set(target, [type, listener]);
        return this;
    }
    trackObserver(observer) {
        this.observers.add(observer);
        return this;
    }
}
const registerObserverIf = (state, registerer, selector, ...params) => {
    if (!state)
        return;
    console.debug(`[${scriptName}] registered observer for "${selector}"`);
    return registerer(selector, ...params);
};
const registerFollowPostObserver = (selector) => {
    const stateProp = normalizeDatasetPropName(`${scriptName}-state`);
    const cleaner = new ObserverCleaner();
    const observer = observe(selector, document, async (buttons, observer) => {
        var _a, _b;
        if (followCount > 100) {
            console.debug(`[${scriptName}] attempted to follow >= 100 posts, disconnecting`);
            observer.disconnect();
            return;
        }
        const { fkey } = StackExchange.options.user;
        for (const button of buttons) {
            if (button.dataset[stateProp] === "follow") {
                continue;
            }
            const state = (_b = (_a = button.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
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
            await delay(500);
        }
    });
    return cleaner.trackObserver(observer);
};
const registerEditObserver = (selector) => {
    const statePropName = normalizeDatasetPropName(`${scriptName}-state`);
    const cleaner = new ObserverCleaner();
    const submitListener = async ({ currentTarget }) => {
        const postId = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.id.replace("submit-button-", "");
        if (!+postId) {
            console.debug(`[${scriptName}] invalid post id: ${postId}`);
            return;
        }
        await followPost(StackExchange.options.user.fkey, postId);
        const [followBtn] = await waitForAdded(`#btnFollowPost-${postId}`, document);
        if (followBtn) {
            followBtn.textContent = "Following";
        }
    };
    const observer = observe(selector, document, (buttons) => {
        for (const button of buttons) {
            if (button.dataset[statePropName] === "follow")
                continue;
            button.dataset[statePropName] = "follow";
            button.addEventListener("click", submitListener);
            cleaner.trackListener(button, "click", submitListener);
        }
    });
    return cleaner.trackObserver(observer);
};
const registerVoteObserver = (selector) => {
    const statePropName = normalizeDatasetPropName(`${scriptName}-state`);
    const cleaner = new ObserverCleaner();
    const submitHandler = async ({ currentTarget }) => {
        await delay(1e3);
        const button = currentTarget;
        const pressedState = button.getAttribute("aria-pressed");
        if (pressedState !== "true")
            return;
        const postContainer = button.closest(".question, .answer");
        if (!postContainer) {
            console.debug(`[${scriptName}] missing post container`);
            return;
        }
        const { answerid, questionid } = postContainer.dataset;
        const postId = answerid || questionid;
        if (!postId) {
            console.debug(`[${scriptName}] missing post id`);
            return;
        }
        await followPost(StackExchange.options.user.fkey, postId);
        const followBtn = postContainer.querySelector(".js-follow-post");
        if (followBtn) {
            followBtn.textContent = "Following";
        }
    };
    const observer = observe(selector, document, (buttons) => {
        for (const button of buttons) {
            if (button.dataset[statePropName] === "follow")
                continue;
            button.dataset[statePropName] = "follow";
            button.addEventListener("click", submitHandler);
            cleaner.trackListener(button, "click", submitHandler);
        }
    });
    return cleaner.trackObserver(observer);
};
const registerPopupObserver = (selector, type) => {
    const statePropName = normalizeDatasetPropName(`${scriptName}-state`);
    const cleaner = new ObserverCleaner();
    const makeSubmitHandler = (popup) => async () => {
        await delay(1e3);
        const { postid } = popup.dataset;
        if (!postid) {
            console.debug(`[${scriptName}] missing post id`);
            return;
        }
        await followPost(StackExchange.options.user.fkey, postid);
        const followBtn = document.getElementById(`btnFollowPost-${postid}`);
        if (followBtn) {
            followBtn.textContent = "Following";
        }
    };
    const observer = observe(selector, document, (buttons) => {
        for (const button of buttons) {
            if (button.dataset[statePropName] === "follow")
                continue;
            button.dataset[statePropName] = "follow";
            const popup = button.closest(`#popup-${type}`);
            if (!popup) {
                console.debug(`[${scriptName}] missing ${type} popup dialog`);
                return;
            }
            const submitHandler = makeSubmitHandler(popup);
            button.addEventListener("click", submitHandler);
            cleaner.trackListener(button, "click", submitHandler);
        }
    });
    return cleaner.trackObserver(observer);
};
const registerCommentObserver = (selector) => {
    const statePropName = normalizeDatasetPropName(`${scriptName}-state`);
    const cleaner = new ObserverCleaner();
    const submitHandler = async ({ currentTarget }) => {
        await delay(1e3);
        const form = currentTarget.closest("[id^='add-comment']");
        if (!form) {
            console.debug(`[${scriptName}] missing comment form`);
            return;
        }
        const postId = form.id.replace("add-comment-", "");
        await followPost(StackExchange.options.user.fkey, postId);
        const followBtn = document.getElementById(`btnFollowPost-${postId}`);
        if (followBtn) {
            followBtn.textContent = "Following";
        }
    };
    const observer = observe(selector, document, (buttons) => {
        for (const button of buttons) {
            if (button.dataset[statePropName] === "follow")
                continue;
            button.dataset[statePropName] = "follow";
            button.addEventListener("click", submitHandler);
            cleaner.trackListener(button, "click", submitHandler);
        }
    });
    return cleaner.trackObserver(observer);
};
const unfollowedPostIdsCache = new Set();
const unfollowPosts = async (page, signal, type) => {
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
        const anchors = $page.find("a.s-post-summary--content-title[href*='/questions']").get();
        if (!anchors.length) {
            console.debug(`[${scriptName}] last page reached`);
            return;
        }
        const postsInfo = anchors.map((anchor) => {
            const [, questionId, answerId] = /\/questions\/(\d+)\/.*?(?:\/(\d+)|$)/.exec(anchor.href) || [];
            return {
                postId: answerId || questionId,
                type: answerId ? "answer" : "question"
            };
        });
        const usedPostsInfo = postsInfo.filter((info) => {
            return type === "all" || type === info.type;
        });
        const numAnchors = usedPostsInfo.length;
        window.dispatchEvent(new CustomEvent("unfollow-progress-page", { detail: { numAnchors, page, } }));
        const { fkey } = StackExchange.options.user;
        for (const { postId } of usedPostsInfo) {
            if (signal.aborted) {
                console.debug(`[${scriptName}] unfollowing aborted`);
                return;
            }
            await unfollowPost(fkey, postId, signal);
            unfollowedPostIdsCache.add(postId);
            window.dispatchEvent(new CustomEvent("unfollow-progress-post", { detail: { numAnchors, page, postId, } }));
            await delay(500);
        }
        await delay(2e3 + 1);
        return unfollowPosts(page + 1, signal, type);
    }
    catch (error) {
        console.debug(`[${scriptName}] failed to get page ${page} of followed posts:\n${error}`);
    }
};
const followPosts = async (postIds, signal) => {
    try {
        const { fkey } = StackExchange.options.user;
        for (const postId of postIds) {
            const status = await followPost(fkey, postId, signal);
            if (status)
                unfollowedPostIdsCache.delete(postId);
            window.dispatchEvent(new CustomEvent("undo-progress-post", { detail: { postId, } }));
            await delay(1e3);
        }
        return true;
    }
    catch (error) {
        console.debug(`[${scriptName}] failed to bulk follow posts:\n${error}`);
        return false;
    }
};
const makeObserverUpdater = (optionToRegistererMap, cleaners) => (event) => {
    var _a;
    const { detail } = event;
    const { name, value } = detail;
    const registererConfig = optionToRegistererMap.get(name);
    if (!registererConfig)
        return;
    const [registerer, selector, ...params] = registererConfig;
    if (!value) {
        console.debug(`[${scriptName}] cleaned observer for "${selector}"`);
        (_a = cleaners.get(name)) === null || _a === void 0 ? void 0 : _a.clean();
        return;
    }
    cleaners.set(name, registerer(selector, ...params));
    console.debug(`[${scriptName}] registered observer for "${selector}"`);
};
const registerObservers = async (optionToRegistererMap, script) => {
    return new Map(await Promise.all([...optionToRegistererMap].map(async ([optionName, [registerer, selector, ...params]]) => {
        const state = await (script === null || script === void 0 ? void 0 : script.load(optionName)) || false;
        return [optionName, registerObserverIf(state, registerer, selector, ...params)];
    })));
};
const initScriptConfiguration = () => {
    var _a, _b;
    const { Configurer } = ((_a = unsafeWindow.UserScripters) === null || _a === void 0 ? void 0 : _a.Userscripts) || {};
    if (!Configurer) {
        console.debug(`[${scriptName}] missing userscript configurer`);
        return;
    }
    const script = Configurer.register(scriptName, (_b = window.Store) === null || _b === void 0 ? void 0 : _b.locateStorage());
    const commonConfig = {
        def: false,
        direction: "left",
        type: "toggle",
    };
    script.options({
        "always-follow-questions": {
            desc: "Autofollow posts on page load",
        },
        "always-follow-answers": {
            desc: "Autofollow answers on page load",
        },
        "always-follow-upvotes": {
            desc: "Autofollow posts on voting up",
        },
        "always-follow-downvotes": {
            desc: "Autofollow posts on voting down",
        },
        "always-follow-close-votes": {
            desc: "Autofollow posts on voting to close",
        },
        "always-follow-flags": {
            desc: "Autofollow posts on flagging",
        },
        "always-follow-edits": {
            desc: "Autofollow posts on edit",
        },
        "always-follow-bookmarks": {
            desc: "Autofollow posts upon bookmarking",
        },
        "always-follow-comments": {
            desc: "Autofollow posts on commenting",
        },
        "reload-on-done": {
            desc: "Reload page after unfollowing all posts",
        },
    }, commonConfig);
    return script;
};
const initScript = () => {
    if (!StackExchange.options.user.isAnonymous) {
        const optionToRegistererMap = new Map([
            ["always-follow-questions", [registerFollowPostObserver, ".js-follow-question"]],
            ["always-follow-answers", [registerFollowPostObserver, ".js-follow-answer"]],
            ["always-follow-upvotes", [registerVoteObserver, ".js-vote-up-btn"]],
            ["always-follow-downvotes", [registerVoteObserver, ".js-vote-down-btn"]],
            ["always-follow-close-votes", [registerPopupObserver, "#popup-close-question .js-popup-submit", "close-question"]],
            ["always-follow-flags", [registerPopupObserver, "#popup-flag-post .js-popup-submit", "flag-post"]],
            ["always-follow-edits", [registerEditObserver, ".inline-editor [id^='submit-button']"]],
            ["always-follow-bookmarks", [registerVoteObserver, ".js-bookmark-btn"]],
            ["always-follow-comments", [registerCommentObserver, ".js-comment-form-layout button[type=submit]"]],
        ]);
        const awaitingConfigurerInterval = setInterval(async () => {
            var _a, _b;
            const configurer = (_b = (_a = unsafeWindow.UserScripters) === null || _a === void 0 ? void 0 : _a.Userscripts) === null || _b === void 0 ? void 0 : _b.Configurer;
            if (!configurer)
                return;
            const script = initScriptConfiguration();
            if (!script)
                return;
            const cleaners = await registerObservers(optionToRegistererMap, script);
            window.addEventListener("userscript-configurer-change", makeObserverUpdater(optionToRegistererMap, cleaners));
            clearInterval(awaitingConfigurerInterval);
        }, 50);
    }
    const search = new URLSearchParams(location.search);
    if (search.get("tab") === "following") {
        const following = document.querySelector("#user-tab-following > div:first-child");
        if (following) {
            const unfollowAllBtn = makeStacksButton(`${scriptName}-unfollow-all-btn`, "Unfollow all", {
                classes: ["s-btn__xs", "flex--item", "ml8"],
                type: "outlined"
            });
            const [unfollowAllModalWrapper, unfollowAllContent] = makeStacksModal(`${scriptName}-unfollow-all-modal`, "Unfollow All Posts", { minWidth: 25 });
            const warning = document.createElement("p");
            warning.innerHTML = `
            This will initiate an irreversible action of unfollowing <strong>all</strong> of your followed posts on the site.<br/>
            The process is intentionally throttled to avoid rate-limiting.<br/>
            If you still wish to proceed, click the "Start" button below.
            `.trim();
            const undoWarning = document.createElement("p");
            undoWarning.innerHTML = `
            Until you reload the page, it is possible to undo the changes made so far by clicking the "Undo" button.
            `.trim();
            const actionWrapper = document.createElement("div");
            actionWrapper.classList.add("d-flex", "ai-center", "gsx", "g12");
            const startAllBtn = makeStacksButton(`${scriptName}-unfollow-all-start-btn`, "Start", {
                classes: ["flex--item"],
                danger: true,
                type: "outlined",
                title: "Start unfollowing all posts"
            });
            const startQbtn = makeStacksButton(`${scriptName}-unfollow-q-start-btn`, "Start Qs", {
                classes: ["flex--item"],
                danger: true,
                type: "outlined",
                title: "Start unfollowing questions only"
            });
            const startAbtn = makeStacksButton(`${scriptName}-unfollow-a-start-btn`, "Start As", {
                classes: ["flex--item"],
                danger: true,
                type: "outlined",
                title: "Start unfollowing answers only"
            });
            const undoBtn = makeStacksButton(`${scriptName}-unfollow-all-undo-btn`, "Undo", {
                classes: ["flex--item"],
                type: "outlined",
                title: "Start undoing unfollowing posts"
            });
            const abortBtn = makeStacksButton(`${scriptName}-unfollow-all-abort-btn`, "Abort", {
                classes: ["flex--item"],
                type: "outlined",
                title: "Abort the current operation immediately"
            });
            const statusReportElem = document.createElement("div");
            statusReportElem.classList.add("flex--item");
            let processedOnPage = 0;
            window.addEventListener("unfollow-progress-page", (event) => {
                const { detail: { page } } = event;
                statusReportElem.textContent = `Unfollowing page ${page}`;
                processedOnPage = 0;
            });
            window.addEventListener("unfollow-progress-post", (event) => {
                processedOnPage += 1;
                const { detail: { numAnchors, page } } = event;
                statusReportElem.textContent = `Unfollowing page ${page} (${processedOnPage}/${numAnchors})`;
            });
            window.addEventListener("undo-progress-post", (event) => {
                const { detail: { postId } } = event;
                statusReportElem.textContent = `Followed post ${postId} (${unfollowedPostIdsCache.size} left)`;
            });
            const startBtns = [startAllBtn, startQbtn, startAbtn];
            let ac;
            const unfollowType = async (button, type) => {
                var _a, _b, _c, _d;
                ac = new AbortController();
                undoBtn.disabled = true;
                startBtns.forEach((b) => b.disabled = true);
                button.classList.add("is-loading");
                await unfollowPosts(1, ac.signal, type);
                button.classList.remove("is-loading");
                statusReportElem.textContent = "Finished unfollowing posts";
                startBtns.forEach((b) => b.disabled = false);
                undoBtn.disabled = false;
                const shouldReload = await ((_d = (_c = (_b = (_a = unsafeWindow.UserScripters) === null || _a === void 0 ? void 0 : _a.Userscripts) === null || _b === void 0 ? void 0 : _b.Configurer) === null || _c === void 0 ? void 0 : _c.get(scriptName)) === null || _d === void 0 ? void 0 : _d.load("reload-on-done")) || false;
                if (shouldReload) {
                    await delay(1e3);
                    location.reload();
                }
            };
            startAllBtn.addEventListener("click", () => unfollowType(startAllBtn, "all"));
            startQbtn.addEventListener("click", () => unfollowType(startQbtn, "question"));
            startAbtn.addEventListener("click", () => unfollowType(startAbtn, "answer"));
            undoBtn.addEventListener("click", async () => {
                ac = new AbortController();
                startAllBtn.disabled = true;
                undoBtn.classList.add("is-loading");
                await followPosts(unfollowedPostIdsCache, ac.signal);
                undoBtn.classList.remove("is-loading");
                startAllBtn.disabled = false;
                statusReportElem.textContent = "Finished refollowing posts";
            });
            abortBtn.addEventListener("click", () => ac.abort());
            unfollowAllBtn.addEventListener("click", () => Stacks.showModal(unfollowAllModalWrapper));
            actionWrapper.append(...startBtns, undoBtn, abortBtn, statusReportElem);
            unfollowAllContent.append(warning, undoWarning, actionWrapper);
            following.append(unfollowAllBtn);
            document.body.append(unfollowAllModalWrapper);
        }
    }
};
window.addEventListener("load", initScript, { once: true });
