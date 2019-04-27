// ==UserScript==
// @name         phantomFullScreen
// @namespace    http://aperocky.com
// @version      0.1
// @description  phantom button that toggle full screen
// @author       Rocky Li
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function looper(){
    document.documentElement.requestFullscreen();
    setTimeout(() => {looper()}, 2000);
})();
