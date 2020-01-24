// Go to healthier forums.

// ==UserScript==
// @name         Block Reddit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Just leave
// @author       Aperocky
// @match        *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let currloc = window.location.hostname.toLowerCase();
    if (currloc.includes("reddit")) {
        console.log("LEAVE REDDIT");
        window.location.replace("https://news.ycombinator.com");
    }
})();
