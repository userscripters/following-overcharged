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
// @version         1.0.0
// ==/UserScript==

"use strict";const scriptName="following-overcharged",makeStacksButton=(e,t,o={})=>{var{classes:o=[],title:a,danger:s=!1,loading:n=!1,muted:l=!1,primary:i=!1,type:r="filled"}=o;const d=document.createElement("button");return d.id=e,d.textContent=t,d.classList.add("s-btn","s-btn__"+r,...o),d.setAttribute("role","button"),d.setAttribute("aria-label",a||t),s&&d.classList.add("s-btn__danger"),l&&d.classList.add("s-btn__muted"),i&&d.classList.add("s-btn__primary"),n&&d.classList.add("is-loading"),a&&(d.title=a),d},makeStacksIcon=(e,t,o={})=>{const{classes:a=[],hidden:s=!1,namespace:n="http://www.w3.org/2000/svg",height:l=18,width:i=18}=o,r=document.createElementNS(n,"svg"),d=(r.classList.add("svg-icon",e,...a),r.setAttribute("width",i.toString()),r.setAttribute("height",l.toString()),r.setAttribute("viewBox",`0 0 ${i} `+l),r.setAttribute("aria-hidden","true"),s&&r.classList.add("d-none"),document.createElementNS(n,"path"));return d.setAttribute("d",t),r.append(d),r},makeDraggable=t=>{document.addEventListener("dragstart",({dataTransfer:e})=>{const t=document.createElement("img");t.src="data:image/png;base64,AAAAAA==",null!=e&&e.setDragImage(t,0,0)});let d=0,c=0,o=0,a=!1;const s=({clientX:o,clientY:a})=>{var s,n=document.getElementById(t);if(n){d=d||o,c=c||a;let{top:e,left:t}=n["style"];e||t||(s=window.getComputedStyle(n),e=s.top,t=s.left);const l=o-d,i=a-c;if(![l,i].map(Math.abs).some(e=>500<e)){const r=n["style"];r.left=parseInt(t)+l+"px",r.top=parseInt(e)+i+"px",d=o,c=a}}};document.addEventListener("dragstart",e=>{e=e.target;e===document.getElementById(t)&&(a=!0)}),document.addEventListener("dragend",({target:e})=>{e===document.getElementById(t)&&(a=!1,d=0,c=0)}),document.addEventListener("drag",e=>{if(!(3<=(o=e.clientX?0:o<3?o+1:3))&&a)return s(e)}),document.addEventListener("dragover",e=>{if(a&&e.preventDefault(),!(o<3)&&a)return s(e)})},makeStacksModal=(e,t,o)=>{var o=o["minWidth"],a="modal-title";const s=document.createElement("aside"),n=(s.classList.add("s-modal"),s.id=e,s.tabIndex=-1,s.setAttribute("role","dialog"),s.setAttribute("aria-labelledby",a),s.setAttribute("aria-describeddy","modal-description"),s.setAttribute("aria-hidden","true"),s)["dataset"],l=(n.sModalTarget="modal",n.controller="s-modal",document.createElement("div")),i=(l.classList.add("s-modal--dialog","ps-relative","hmx6","wmn"+o),l.setAttribute("role","document"),l.id=e+"-document",l.draggable=!0,document.createElement("h1")),r=(i.classList.add("s-modal--header"),i.id=a,i.textContent=t,document.createElement("button"));r.classList.add("s-modal--close","s-btn","s-btn__muted"),r.type="button",r.dataset.action="s-modal#hide";o=makeStacksIcon("iconClearSm","M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z",{width:14,height:14});return makeDraggable(l.id),r.append(o),l.append(i,r),s.append(l),[s,l]},observe=(a,s,n)=>{var e=(e,t)=>{var o=s.querySelectorAll(a);o.length&&n([...o],t)};const t=new MutationObserver(e);t.observe(s,{attributes:!0,childList:!0,subtree:!0}),e(0,t)},delay=(t=100)=>new Promise(e=>setTimeout(e,t)),normalizeDatasetPropName=e=>e.split("-").map(([e,...t],o)=>""+(o?e.toUpperCase():e.toLowerCase())+t.join("").toLowerCase()).join(""),followPost=async(e,t,o)=>{const a=new URL(location.origin+`/posts/${t}/vote/21`),s=new URLSearchParams;return s.set("fkey",e),(await fetch(a.toString(),{body:s,credentials:"include",method:"POST",signal:o})).ok},unfollowPost=async(e,t,o)=>{const a=new URL(location.origin+`/posts/${t}/vote/21`),s=(a.searchParams.append("undo","true"),new URLSearchParams);return s.set("fkey",e),(await fetch(a.toString(),{body:s,credentials:"include",method:"POST",signal:o})).ok};let followCount=0;const registerFollowPostObserver=e=>{observe(e,document,async(e,t)=>{if(100<followCount)return console.debug(`[${scriptName}] attempted to follow >= 100 posts, disconnecting`),void t.disconnect();var o,a,s=normalizeDatasetPropName(scriptName+"-state"),n=StackExchange.options.user["fkey"];for(const l of e)"follow"!==l.dataset[s]&&((o=null==(o=null==(o=l.textContent)?void 0:o.toLowerCase())?void 0:o.trim())?+(a=l.id.replace("btnFollowPost-",""))?("follow"===o&&(followCount+=1,await followPost(n,a),l.dataset[s]=o,l.textContent="Following"),await delay(500)):console.debug(`[${scriptName}] failed to get postId from follow button`):console.debug(`[${scriptName}] empty follow button found`))})},unfollowAllPosts=async(t,e)=>{try{var o=StackExchange.options.user["userId"];if(!o)return void console.debug(`[${scriptName}] missing user id`);const d=new URL(location.origin+"/users/"+o),c=d["searchParams"],u=(c.append("tab","following"),c.append("sort","newest"),c.append("page",t.toString()),await fetch(d.toString(),{signal:e}));if(!u.ok)return void console.debug(`[${scriptName}] failed to fetch page ${t} of followed posts`);const m=$(await u.text());var a=m.find("a.s-post-summary--content-title[href*='/questions']").get();if(!a.length)return void console.debug(`[${scriptName}] last page reached`);var s=a.length,n=(window.dispatchEvent(new CustomEvent("unfollow-progress-page",{detail:{numAnchors:s,page:t}})),StackExchange.options.user)["fkey"];for(const p of a){if(e.aborted)return void console.debug(`[${scriptName}] unfollowing aborted`);var[,l,i]=/\/questions\/(\d+)\/.*?(?:\/(\d+)|$)/.exec(p.href)||[],r=i||l;await unfollowPost(n,r,e),window.dispatchEvent(new CustomEvent("unfollow-progress-post",{detail:{numAnchors:s,page:t,postId:r}})),await delay(500)}return await delay(2001),unfollowAllPosts(t+1,e)}catch(e){console.debug(`[${scriptName}] failed to get page ${t} of followed posts:
`+e)}};unsafeWindow.addEventListener("userscript-configurer-load",()=>{var e;const t=((null==(e=unsafeWindow.UserScripters)?void 0:e.Userscripts)||{})["Configurer"];if(t){const o=t.register(scriptName);o.option("always-follow-questions",{type:"toggle",desc:"Autofollow posts on page load",def:!1}),o.option("always-follow-answers",{type:"toggle",desc:"Autofollow answers on page load",def:!1}),o.option("reload-on-done",{type:"toggle",desc:"Reload page after unfollowing all posts",def:!1})}else console.debug(`[${scriptName}] missing userscript configurer`)}),window.addEventListener("load",async()=>{var e;const t=null==(e=null==(e=null==(e=unsafeWindow.UserScripters)?void 0:e.Userscripts)?void 0:e.Configurer)?void 0:e.get(scriptName),o=(StackExchange.options.user.isAnonymous||(await(null===t||void 0===t?void 0:t.load("always-follow-questions"))&&registerFollowPostObserver(".js-follow-question"),(await(null===t||void 0===t?void 0:t.load("always-follow-answers"))||!1)&&registerFollowPostObserver(".js-follow-answer")),new URLSearchParams(location.search));if("following"===o.get("tab")){const a=document.querySelector("#user-tab-following > div:first-child");if(a){const s=makeStacksButton(scriptName+"-unfollow-all-btn","Unfollow all",{classes:["s-btn__xs","flex--item","ml8"],type:"outlined"}),[n,l]=makeStacksModal(scriptName+"-unfollow-all-modal","Unfollow All Posts",{minWidth:25}),i=document.createElement("p"),r=(i.innerHTML=`
            This will initiate an irreversible action of unfollowing <strong>all</strong> of your followed posts on the site.<br/>
            The process is intentionally throttled to avoid rate-limiting.<br/>
            If you still wish to proceed, click the "Start" button below.
            `.trim(),document.createElement("div")),d=(r.classList.add("d-flex","ai-center","gsx","g12"),makeStacksButton(scriptName+"-unfollow-all-start-btn","Start",{classes:["flex--item"],danger:!0,type:"outlined"})),c=makeStacksButton(scriptName+"-unfollow-all-abort-btn","Abort",{classes:["flex--item"],type:"outlined"}),u=document.createElement("div");u.classList.add("flex--item");let o=0;window.addEventListener("unfollow-progress-page",e=>{var e=e["detail"]["page"];u.textContent="Unfollowing page "+e,o=0}),window.addEventListener("unfollow-progress-post",e=>{o+=1;var{numAnchors:e,page:t}=e["detail"];u.textContent=`Unfollowing page ${t} (${o}/${e})`});const m=new AbortController;d.addEventListener("click",async()=>{d.classList.add("is-loading"),await unfollowAllPosts(1,m.signal),d.classList.remove("is-loading"),u.textContent="Finished unfollowing posts",(null===t||void 0===t?!void 0:!t.load("reload-on-done"))&&1||(await delay(1e3),location.reload())}),c.addEventListener("click",()=>m.abort()),s.addEventListener("click",()=>Stacks.showModal(n)),r.append(d,c,u),l.append(i,r),a.append(s),document.body.append(n)}}},{once:!0});