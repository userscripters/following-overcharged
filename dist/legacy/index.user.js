// ==UserScript==
// @name            Following Overcharged
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Various improvements to the "follow" feature
// @grant           unsafeWindow
// @homepage        https://github.com/userscripters/following-overcharged#readme
// @match           https://stackoverflow.com/questions/*
// @match           https://stackoverflow.com/users/*
// @match           https://serverfault.com/questions/*
// @match           https://serverfault.com/users/*
// @match           https://superuser.com/questions/*
// @match           https://superuser.com/users/*
// @match           https://*.stackexchange.com/questions/*
// @match           https://*.stackexchange.com/users/*
// @match           https://askubuntu.com/questions/*
// @match           https://askubuntu.com/users/*
// @match           https://stackapps.com/questions/*
// @match           https://stackapps.com/users/*
// @match           https://mathoverflow.net/questions/*
// @match           https://mathoverflow.net/users/*
// @match           https://pt.stackoverflow.com/questions/*
// @match           https://pt.stackoverflow.com/users/*
// @match           https://ja.stackoverflow.com/questions/*
// @match           https://ja.stackoverflow.com/users/*
// @match           https://ru.stackoverflow.com/questions/*
// @match           https://ru.stackoverflow.com/users/*
// @match           https://es.stackoverflow.com/questions/*
// @match           https://es.stackoverflow.com/users/*
// @match           https://meta.stackoverflow.com/questions/*
// @match           https://meta.stackoverflow.com/users/*
// @match           https://meta.serverfault.com/questions/*
// @match           https://meta.serverfault.com/users/*
// @match           https://meta.superuser.com/questions/*
// @match           https://meta.superuser.com/users/*
// @match           https://meta.askubuntu.com/questions/*
// @match           https://meta.askubuntu.com/users/*
// @match           https://meta.mathoverflow.net/questions/*
// @match           https://meta.mathoverflow.net/users/*
// @match           https://pt.meta.stackoverflow.com/questions/*
// @match           https://pt.meta.stackoverflow.com/users/*
// @match           https://ja.meta.stackoverflow.com/questions/*
// @match           https://ja.meta.stackoverflow.com/users/*
// @match           https://ru.meta.stackoverflow.com/questions/*
// @match           https://ru.meta.stackoverflow.com/users/*
// @match           https://es.meta.stackoverflow.com/questions/*
// @match           https://es.meta.stackoverflow.com/users/*
// @namespace       userscripters
// @run-at          document-start
// @source          git+https://github.com/userscripters/following-overcharged.git
// @supportURL      https://github.com/userscripters/following-overcharged/issues
// @version         1.2.1
// ==/UserScript==

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var scriptName = "following-overcharged";
var makeStacksButton = function (id, text, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var _b = options.classes, classes = _b === void 0 ? [] : _b, title = options.title, _c = options.danger, danger = _c === void 0 ? false : _c, _d = options.loading, loading = _d === void 0 ? false : _d, _e = options.muted, muted = _e === void 0 ? false : _e, _f = options.primary, primary = _f === void 0 ? false : _f, _g = options.type, type = _g === void 0 ? "filled" : _g;
    var btn = document.createElement("button");
    btn.id = id;
    btn.textContent = text;
    (_a = btn.classList).add.apply(_a, __spreadArray(["s-btn", "s-btn__".concat(type)], __read(classes), false));
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
var makeStacksIcon = function (name, pathConfig, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var _b = options.classes, classes = _b === void 0 ? [] : _b, _c = options.hidden, hidden = _c === void 0 ? false : _c, _d = options.namespace, namespace = _d === void 0 ? "http://www.w3.org/2000/svg" : _d, _e = options.height, height = _e === void 0 ? 18 : _e, _f = options.width, width = _f === void 0 ? 18 : _f;
    var svg = document.createElementNS(namespace, "svg");
    (_a = svg.classList).add.apply(_a, __spreadArray(["svg-icon", name], __read(classes), false));
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
    svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
    svg.setAttribute("aria-hidden", "true");
    if (hidden)
        svg.classList.add("d-none");
    var path = document.createElementNS(namespace, "path");
    path.setAttribute("d", pathConfig);
    svg.append(path);
    return svg;
};
var makeDraggable = function (id) {
    document.addEventListener("dragstart", function (_a) {
        var dataTransfer = _a.dataTransfer;
        var dummy = document.createElement("img");
        dummy.src = "data:image/png;base64,AAAAAA==";
        dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setDragImage(dummy, 0, 0);
    });
    var previousX = 0;
    var previousY = 0;
    var zeroed = 0;
    var isDragging = false;
    var handleCoordChange = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        var modal = document.getElementById(id);
        if (!modal)
            return;
        previousX || (previousX = clientX);
        previousY || (previousY = clientY);
        var _b = modal.style, top = _b.top, left = _b.left;
        if (!top && !left) {
            var computed = window.getComputedStyle(modal);
            top = computed.top;
            left = computed.left;
        }
        var moveX = clientX - previousX;
        var moveY = clientY - previousY;
        var superSonic = 500;
        if ([moveX, moveY].map(Math.abs).some(function (c) { return c > superSonic; }))
            return;
        var style = modal.style;
        style.left = "".concat(parseInt(left) + moveX, "px");
        style.top = "".concat(parseInt(top) + moveY, "px");
        previousX = clientX;
        previousY = clientY;
    };
    document.addEventListener("dragstart", function (event) {
        var target = event.target;
        if (target === document.getElementById(id))
            isDragging = true;
    });
    document.addEventListener("dragend", function (_a) {
        var target = _a.target;
        if (target === document.getElementById(id)) {
            isDragging = false;
            previousX = 0;
            previousY = 0;
        }
    });
    document.addEventListener("drag", function (event) {
        zeroed = event.clientX ? 0 : zeroed < 3 ? zeroed + 1 : 3;
        if (zeroed >= 3 || !isDragging)
            return;
        return handleCoordChange(event);
    });
    document.addEventListener("dragover", function (e) {
        if (isDragging)
            e.preventDefault();
        if (zeroed < 3 || !isDragging)
            return;
        return handleCoordChange(e);
    });
};
var makeStacksModal = function (id, header, options) {
    var minWidth = options.minWidth;
    var ariaLabelId = "modal-title";
    var ariaDescrId = "modal-description";
    var wrap = document.createElement("aside");
    wrap.classList.add("s-modal");
    wrap.id = id;
    wrap.tabIndex = -1;
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-labelledby", ariaLabelId);
    wrap.setAttribute("aria-describeddy", ariaDescrId);
    wrap.setAttribute("aria-hidden", "true");
    var dataset = wrap.dataset;
    dataset.sModalTarget = "modal";
    dataset.controller = "s-modal";
    var doc = document.createElement("div");
    doc.classList.add("s-modal--dialog", "ps-relative", "hmx6", "wmn".concat(minWidth));
    doc.setAttribute("role", "document");
    doc.id = "".concat(id, "-document");
    doc.draggable = true;
    var title = document.createElement("h1");
    title.classList.add("s-modal--header");
    title.id = ariaLabelId;
    title.textContent = header;
    var close = document.createElement("button");
    close.classList.add("s-modal--close", "s-btn", "s-btn__muted");
    close.type = "button";
    close.dataset.action = "s-modal#hide";
    var closeIcon = makeStacksIcon("iconClearSm", "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z", { width: 14, height: 14 });
    makeDraggable(doc.id);
    close.append(closeIcon);
    doc.append(title, close);
    wrap.append(doc);
    return [wrap, doc];
};
var observe = function (selector, context, callback) {
    var observerCallback = function (_, observer) {
        var collection = context.querySelectorAll(selector);
        if (collection.length)
            callback(__spreadArray([], __read(collection), false), observer);
    };
    var observer = new MutationObserver(observerCallback);
    observer.observe(context, {
        attributes: true,
        childList: true,
        subtree: true,
    });
    observerCallback([], observer);
};
var delay = function (ms) {
    if (ms === void 0) { ms = 100; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
var normalizeDatasetPropName = function (name) { return name.split("-").map(function (_a, i) {
    var _b = __read(_a), first = _b[0], rest = _b.slice(1);
    return "".concat(i ? first.toUpperCase() : first.toLowerCase()).concat(rest.join("").toLowerCase());
}).join(""); };
var followPost = function (fkey, postId, signal) { return __awaiter(void 0, void 0, void 0, function () {
    var url, body, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(location.origin, "/posts/").concat(postId, "/vote/21"));
                body = new URLSearchParams();
                body.set("fkey", fkey);
                return [4, fetch(url.toString(), {
                        body: body,
                        credentials: "include",
                        method: "POST",
                        signal: signal
                    })];
            case 1:
                res = _a.sent();
                return [2, res.ok];
        }
    });
}); };
var unfollowPost = function (fkey, postId, signal) { return __awaiter(void 0, void 0, void 0, function () {
    var url, body, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(location.origin, "/posts/").concat(postId, "/vote/21"));
                url.searchParams.append("undo", "true");
                body = new URLSearchParams();
                body.set("fkey", fkey);
                return [4, fetch(url.toString(), {
                        body: body,
                        credentials: "include",
                        method: "POST",
                        signal: signal
                    })];
            case 1:
                res = _a.sent();
                return [2, res.ok];
        }
    });
}); };
var followCount = 0;
var registerFollowPostObserver = function (selector) {
    observe(selector, document, function (buttons, observer) { return __awaiter(void 0, void 0, void 0, function () {
        var stateProp, fkey, buttons_1, buttons_1_1, button, state, postId, e_1_1;
        var e_1, _a;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (followCount > 100) {
                        console.debug("[".concat(scriptName, "] attempted to follow >= 100 posts, disconnecting"));
                        observer.disconnect();
                        return [2];
                    }
                    stateProp = normalizeDatasetPropName("".concat(scriptName, "-state"));
                    fkey = StackExchange.options.user.fkey;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 8, 9, 10]);
                    buttons_1 = __values(buttons), buttons_1_1 = buttons_1.next();
                    _d.label = 2;
                case 2:
                    if (!!buttons_1_1.done) return [3, 7];
                    button = buttons_1_1.value;
                    if (button.dataset[stateProp] === "follow") {
                        return [3, 6];
                    }
                    state = (_c = (_b = button.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.trim();
                    if (!state) {
                        console.debug("[".concat(scriptName, "] empty follow button found"));
                        return [3, 6];
                    }
                    postId = button.id.replace("btnFollowPost-", "");
                    if (!+postId) {
                        console.debug("[".concat(scriptName, "] failed to get postId from follow button"));
                        return [3, 6];
                    }
                    if (!(state === "follow")) return [3, 4];
                    followCount += 1;
                    return [4, followPost(fkey, postId)];
                case 3:
                    _d.sent();
                    button.dataset[stateProp] = state;
                    button.textContent = "Following";
                    _d.label = 4;
                case 4: return [4, delay(500)];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    buttons_1_1 = buttons_1.next();
                    return [3, 2];
                case 7: return [3, 10];
                case 8:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 10];
                case 9:
                    try {
                        if (buttons_1_1 && !buttons_1_1.done && (_a = buttons_1.return)) _a.call(buttons_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 10: return [2];
            }
        });
    }); });
};
var registerEditObserver = function (selector) {
    var statePropName = normalizeDatasetPropName("".concat(scriptName, "-edit-state"));
    observe(selector, document, function (buttons) {
        var e_2, _a;
        var fkey = StackExchange.options.user.fkey;
        var _loop_1 = function (button) {
            if (button.dataset[statePropName] === "follow")
                return "continue";
            button.dataset[statePropName] = "follow";
            button.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
                var postId, followBtn;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            postId = button.id.replace("submit-button-", "");
                            if (!+postId) {
                                console.debug("[".concat(scriptName, "] invalid post id: ").concat(postId));
                                return [2];
                            }
                            return [4, followPost(fkey, postId)];
                        case 1:
                            _a.sent();
                            followBtn = document.getElementById("btnFollowPost-".concat(postId));
                            if (followBtn) {
                                followBtn.textContent = "Following";
                            }
                            return [2];
                    }
                });
            }); });
        };
        try {
            for (var buttons_2 = __values(buttons), buttons_2_1 = buttons_2.next(); !buttons_2_1.done; buttons_2_1 = buttons_2.next()) {
                var button = buttons_2_1.value;
                _loop_1(button);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (buttons_2_1 && !buttons_2_1.done && (_a = buttons_2.return)) _a.call(buttons_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
};
var registerVoteObserver = function (selector) {
    var statePropName = normalizeDatasetPropName("".concat(scriptName, "-dv-state"));
    observe(selector, document, function (buttons) {
        var e_3, _a;
        var fkey = StackExchange.options.user.fkey;
        var _loop_2 = function (button) {
            if (button.dataset[statePropName] === "follow")
                return "continue";
            button.dataset[statePropName] = "follow";
            button.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
                var pressedState, postContainer, _a, answerid, questionid, postId, followBtn;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, delay(1e3)];
                        case 1:
                            _b.sent();
                            pressedState = button.getAttribute("aria-pressed");
                            if (pressedState !== "true")
                                return [2];
                            postContainer = button.closest(".question, .answer");
                            if (!postContainer) {
                                console.debug("[".concat(scriptName, "] missing post container"));
                                return [2];
                            }
                            _a = postContainer.dataset, answerid = _a.answerid, questionid = _a.questionid;
                            postId = answerid || questionid;
                            if (!postId) {
                                console.debug("[".concat(scriptName, "] missing post id"));
                                return [2];
                            }
                            return [4, followPost(fkey, postId)];
                        case 2:
                            _b.sent();
                            followBtn = postContainer.querySelector(".js-follow-post");
                            if (followBtn) {
                                followBtn.textContent = "Following";
                            }
                            return [2];
                    }
                });
            }); });
        };
        try {
            for (var buttons_3 = __values(buttons), buttons_3_1 = buttons_3.next(); !buttons_3_1.done; buttons_3_1 = buttons_3.next()) {
                var button = buttons_3_1.value;
                _loop_2(button);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (buttons_3_1 && !buttons_3_1.done && (_a = buttons_3.return)) _a.call(buttons_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
};
var unfollowAllPosts = function (page, signal) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, url, searchParams, res, $page, _a, anchors, numAnchors, fkey, anchors_1, anchors_1_1, anchor, _b, questionId, answerId, postId, e_4_1, error_1;
    var e_4, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 13, , 14]);
                userId = StackExchange.options.user.userId;
                if (!userId) {
                    console.debug("[".concat(scriptName, "] missing user id"));
                    return [2];
                }
                url = new URL("".concat(location.origin, "/users/").concat(userId));
                searchParams = url.searchParams;
                searchParams.append("tab", "following");
                searchParams.append("sort", "newest");
                searchParams.append("page", page.toString());
                return [4, fetch(url.toString(), { signal: signal })];
            case 1:
                res = _d.sent();
                if (!res.ok) {
                    console.debug("[".concat(scriptName, "] failed to fetch page ").concat(page, " of followed posts"));
                    return [2];
                }
                _a = $;
                return [4, res.text()];
            case 2:
                $page = _a.apply(void 0, [_d.sent()]);
                anchors = $page.find("a.s-post-summary--content-title[href*='/questions']").get();
                if (!anchors.length) {
                    console.debug("[".concat(scriptName, "] last page reached"));
                    return [2];
                }
                numAnchors = anchors.length;
                window.dispatchEvent(new CustomEvent("unfollow-progress-page", { detail: { numAnchors: numAnchors, page: page, } }));
                fkey = StackExchange.options.user.fkey;
                _d.label = 3;
            case 3:
                _d.trys.push([3, 9, 10, 11]);
                anchors_1 = __values(anchors), anchors_1_1 = anchors_1.next();
                _d.label = 4;
            case 4:
                if (!!anchors_1_1.done) return [3, 8];
                anchor = anchors_1_1.value;
                if (signal.aborted) {
                    console.debug("[".concat(scriptName, "] unfollowing aborted"));
                    return [2];
                }
                _b = __read(/\/questions\/(\d+)\/.*?(?:\/(\d+)|$)/.exec(anchor.href) || [], 3), questionId = _b[1], answerId = _b[2];
                postId = answerId || questionId;
                return [4, unfollowPost(fkey, postId, signal)];
            case 5:
                _d.sent();
                window.dispatchEvent(new CustomEvent("unfollow-progress-post", { detail: { numAnchors: numAnchors, page: page, postId: postId, } }));
                return [4, delay(500)];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                anchors_1_1 = anchors_1.next();
                return [3, 4];
            case 8: return [3, 11];
            case 9:
                e_4_1 = _d.sent();
                e_4 = { error: e_4_1 };
                return [3, 11];
            case 10:
                try {
                    if (anchors_1_1 && !anchors_1_1.done && (_c = anchors_1.return)) _c.call(anchors_1);
                }
                finally { if (e_4) throw e_4.error; }
                return [7];
            case 11: return [4, delay(2e3 + 1)];
            case 12:
                _d.sent();
                return [2, unfollowAllPosts(page + 1, signal)];
            case 13:
                error_1 = _d.sent();
                console.debug("[".concat(scriptName, "] failed to get page ").concat(page, " of followed posts:\n").concat(error_1));
                return [3, 14];
            case 14: return [2];
        }
    });
}); };
unsafeWindow.addEventListener("userscript-configurer-load", function () {
    var _a;
    var Configurer = (((_a = unsafeWindow.UserScripters) === null || _a === void 0 ? void 0 : _a.Userscripts) || {}).Configurer;
    if (!Configurer) {
        console.debug("[".concat(scriptName, "] missing userscript configurer"));
        return;
    }
    var script = Configurer.register(scriptName);
    var commonConfig = {
        def: false,
        direction: "left",
        type: "toggle",
    };
    script.option("always-follow-questions", __assign(__assign({}, commonConfig), { desc: "Autofollow posts on page load" }));
    script.option("always-follow-answers", __assign(__assign({}, commonConfig), { desc: "Autofollow answers on page load" }));
    script.option("always-follow-upvotes", __assign(__assign({}, commonConfig), { desc: "Autofollow posts on voting up" }));
    script.option("always-follow-downvotes", __assign(__assign({}, commonConfig), { desc: "Autofollow posts on voting down" }));
    script.option("always-follow-edits", __assign(__assign({}, commonConfig), { desc: "Autofollow posts on edit" }));
    script.option("reload-on-done", __assign(__assign({}, commonConfig), { desc: "Reload page after unfollowing all posts" }));
});
window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
    var script, alwaysFollowQuestions, alwaysFollowAnswers, alwaysFollowUV, alwaysFollowDV, alwaysFollowEdits, search, following, unfollowAllBtn, _a, unfollowAllModalWrapper_1, unfollowAllContent, warning, actionWrapper, startBtn_1, abortBtn, statusReportElem_1, processedOnPage_1, ac_1;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                script = (_d = (_c = (_b = unsafeWindow.UserScripters) === null || _b === void 0 ? void 0 : _b.Userscripts) === null || _c === void 0 ? void 0 : _c.Configurer) === null || _d === void 0 ? void 0 : _d.get(scriptName);
                if (!!StackExchange.options.user.isAnonymous) return [3, 6];
                return [4, (script === null || script === void 0 ? void 0 : script.load("always-follow-questions"))];
            case 1:
                alwaysFollowQuestions = (_e.sent()) || false;
                if (alwaysFollowQuestions) {
                    registerFollowPostObserver(".js-follow-question");
                }
                return [4, (script === null || script === void 0 ? void 0 : script.load("always-follow-answers"))];
            case 2:
                alwaysFollowAnswers = (_e.sent()) || false;
                if (alwaysFollowAnswers) {
                    registerFollowPostObserver(".js-follow-answer");
                }
                return [4, (script === null || script === void 0 ? void 0 : script.load("always-follow-upvotes"))];
            case 3:
                alwaysFollowUV = (_e.sent()) || false;
                if (alwaysFollowUV) {
                    registerVoteObserver(".js-vote-up-btn");
                }
                return [4, (script === null || script === void 0 ? void 0 : script.load("always-follow-downvotes"))];
            case 4:
                alwaysFollowDV = (_e.sent()) || false;
                if (alwaysFollowDV) {
                    registerVoteObserver(".js-vote-down-btn");
                }
                return [4, (script === null || script === void 0 ? void 0 : script.load("always-follow-edits"))];
            case 5:
                alwaysFollowEdits = (_e.sent()) || false;
                if (alwaysFollowEdits) {
                    registerEditObserver(".inline-editor [id^='submit-button']");
                }
                _e.label = 6;
            case 6:
                search = new URLSearchParams(location.search);
                if (search.get("tab") === "following") {
                    following = document.querySelector("#user-tab-following > div:first-child");
                    if (following) {
                        unfollowAllBtn = makeStacksButton("".concat(scriptName, "-unfollow-all-btn"), "Unfollow all", {
                            classes: ["s-btn__xs", "flex--item", "ml8"],
                            type: "outlined"
                        });
                        _a = __read(makeStacksModal("".concat(scriptName, "-unfollow-all-modal"), "Unfollow All Posts", { minWidth: 25 }), 2), unfollowAllModalWrapper_1 = _a[0], unfollowAllContent = _a[1];
                        warning = document.createElement("p");
                        warning.innerHTML = "\n            This will initiate an irreversible action of unfollowing <strong>all</strong> of your followed posts on the site.<br/>\n            The process is intentionally throttled to avoid rate-limiting.<br/>\n            If you still wish to proceed, click the \"Start\" button below.\n            ".trim();
                        actionWrapper = document.createElement("div");
                        actionWrapper.classList.add("d-flex", "ai-center", "gsx", "g12");
                        startBtn_1 = makeStacksButton("".concat(scriptName, "-unfollow-all-start-btn"), "Start", {
                            classes: ["flex--item"],
                            danger: true,
                            type: "outlined"
                        });
                        abortBtn = makeStacksButton("".concat(scriptName, "-unfollow-all-abort-btn"), "Abort", {
                            classes: ["flex--item"],
                            type: "outlined"
                        });
                        statusReportElem_1 = document.createElement("div");
                        statusReportElem_1.classList.add("flex--item");
                        processedOnPage_1 = 0;
                        window.addEventListener("unfollow-progress-page", function (event) {
                            var page = event.detail.page;
                            statusReportElem_1.textContent = "Unfollowing page ".concat(page);
                            processedOnPage_1 = 0;
                        });
                        window.addEventListener("unfollow-progress-post", function (event) {
                            processedOnPage_1 += 1;
                            var _a = event.detail, numAnchors = _a.numAnchors, page = _a.page;
                            statusReportElem_1.textContent = "Unfollowing page ".concat(page, " (").concat(processedOnPage_1, "/").concat(numAnchors, ")");
                        });
                        ac_1 = new AbortController();
                        startBtn_1.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var shouldReload;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        startBtn_1.classList.add("is-loading");
                                        return [4, unfollowAllPosts(1, ac_1.signal)];
                                    case 1:
                                        _a.sent();
                                        startBtn_1.classList.remove("is-loading");
                                        statusReportElem_1.textContent = "Finished unfollowing posts";
                                        shouldReload = (script === null || script === void 0 ? void 0 : script.load("reload-on-done")) || false;
                                        if (!shouldReload) return [3, 3];
                                        return [4, delay(1e3)];
                                    case 2:
                                        _a.sent();
                                        location.reload();
                                        _a.label = 3;
                                    case 3: return [2];
                                }
                            });
                        }); });
                        abortBtn.addEventListener("click", function () { return ac_1.abort(); });
                        unfollowAllBtn.addEventListener("click", function () { return Stacks.showModal(unfollowAllModalWrapper_1); });
                        actionWrapper.append(startBtn_1, abortBtn, statusReportElem_1);
                        unfollowAllContent.append(warning, actionWrapper);
                        following.append(unfollowAllBtn);
                        document.body.append(unfollowAllModalWrapper_1);
                    }
                }
                return [2];
        }
    });
}); }, { once: true });
