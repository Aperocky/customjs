// ==UserScript==
// @name         StackHelper
// @namespace    http://aperocky.com
// @version      1.0
// @description  Stackoverflow helper to make question *very* clear
// @author       Rocky Li
// @match        https://stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

let watchtags = new Set(["python", "pandas", "numpy", "algorithm", "python-requests", "flask",
                         "scipy", "multithreading", "matplotlib", "sklearn", "regex", "text",
                         "bash", "html", "list", "dictionary", "selenium", "beautifulsoup"]);
// Tags you don't want to see/answer.
let unwatch = new Set(["keras", "tensorflow", "android", "pygame", "pytorch",
                       "tkinter", "aws", "amazon-s3", "sympy", "php", "opencv",
                       "sql-server", "c#", "windows", "qt"]);

function highlightTags() {
    let posttags = document.querySelectorAll("a.post-tag");
    // Tags you want to see/answer.
    for (let i = 0; i < posttags.length; i++){
        let taglabel = posttags[i].text;
        /*
        Edit tag colors:
        wanted tag: light gold.
        unwanted tag: brown.
        */
        if (watchtags.has(taglabel)){
            posttags[i].style.backgroundColor = "#FFEE99";
            posttags[i].style.fontSize = "medium";
        } else if (unwatch.has(taglabel)){
            posttags[i].style.backgroundColor = "#DEB887";
            posttags[i].style.fontSize = "medium";
        } else {
            posttags[i].style.backgroundColor = "#E5E5E9";
        }
    }
};

function highlightUnanswered() {
    let unanswered = document.querySelectorAll("div.status.unanswered");
    for (let i = 0; i < unanswered.length; i++){
        unanswered[i].style.border = "5px solid rgba(0, 100, 255, 0.2)";
        unanswered[i].style.backgroundColor = "rgba(0, 100, 255, 0.1)";
    }
};

function clickOnNew(){
    // Automatically click on 'new questions!' bar as it comes up.
    let newsAlert = document.querySelector(".js-new-post-activity");
    if (newsAlert){
        newsAlert.click();
    }
};

function askerProficiency(){
    let askerInfos = document.querySelectorAll("div.user-info");
    // console.log(`${askerInfos.length} question asked`);
    for (let i = 0; i < askerInfos.length; i++){
        let askerinfo = askerInfos[i];
        let reputation = askerinfo.querySelector("span.reputation-score");
        /*
        User colors by reputation:
        >10k  : light gold
        >1000 : green
        >100  : lighter green
        >=10  : silver
        <10   : light brown
        Also adds a nice curve and border to the user card.
        */
        askerinfo.style.borderRadius = "5px";
        askerinfo.style.border = "1px solid"
        if (reputation){
            if (reputation.innerText.includes("k")){
                askerinfo.style.backgroundColor = "#FFEE88"
            } else if (reputation.innerText.includes(",")){
                askerinfo.style.backgroundColor = "#afa";
            } else if (reputation.innerText > 100){
                askerinfo.style.backgroundColor = "#cfc";
            } else if (reputation.innerText < 10){
                askerinfo.style.backgroundColor = "#E9D0AF";
            } else {
                askerinfo.style.backgroundColor = "#eee";
            }
        }
    }
}

(function looper() {
    clickOnNew();
    highlightTags();
    highlightUnanswered();
    askerProficiency();
    setTimeout(function(){
        looper();
    }, 5000);
})();

let toggleDesirable = (function (){
    let isHidden = true;
    let linkWords = ["UnFilter", "Filter Tags"];
    let displayVar = ["flex", "none"];
    return function (event){
        event.preventDefault();
        let desirables = document.querySelectorAll("div.question-summary");
        for (let i = 0; i < desirables.length; i++){
            let title = desirables[i].querySelector("a.question-hyperlink").text;
            let tags = desirables[i].querySelectorAll("a.post-tag");
            for (let j = 0; j < tags.length; j++){
                if (unwatch.has(tags[j].text)){
                    desirables[i].style.display = displayVar[isHidden ? 1 : 0];
                    break;
                }
            }
        }
    isHidden = !isHidden;
    let target = event.target;
    target.textContent = linkWords[isHidden ? 1 : 0];
    };
})();

let toggleSideBar = (function (){
    let toggleT = true;
    let linkWords = ["SideBar On", "SideBar Off"]
    let displayVar = ["block", "none"];
    let mainBarADJ = ["- 300px", ""];
    return function (event){
        event.preventDefault();
        let sideBar = document.querySelector("div#sidebar");
        if (sideBar){
            sideBar.style.display = displayVar[toggleT ? 1 : 0]
        }
        let mainBar = document.querySelector("div#mainbar")
        mainBar.style.width = `calc(100% ${mainBarADJ[toggleT ? 1 : 0]} - 24px)`;
        toggleT = !toggleT;
        let target = event.target;
        target.textContent = linkWords[toggleT ? 1 : 0];
    };
})();

(function addNavSection(){
    // Stackoverflow default sidebar.
    let sideNav = document.querySelector("ol.nav-links");

    // Adding this custom element to the end of it.
    let node = document.createElement("ol");
    node.className = "nav-links";

    let banner = (function getBanner(){
        let banner = document.createElement("li");
        banner.className = "fs-fine tt-uppercase ml8 mt16 mb4 fc-light";
        banner.textContent = "STACK HELPER";
        node.appendChild(banner);
    })();

    let newlink = function getLinks(text, func){
        let link = document.createElement("li")
        let innerlink = document.createElement("a")
        innerlink.className = "js-gps-track nav-links--link";
        innerlink.textContent = text;
        innerlink.addEventListener("click", func);
        link.appendChild(innerlink)
        return link
    };

    let toggleD = newlink("Filter Tags", toggleDesirable);
    let toggleS = newlink("SideBar Off", toggleSideBar);

    sideNav.appendChild(node);
    sideNav.appendChild(toggleD);
    sideNav.appendChild(toggleS)
})();
