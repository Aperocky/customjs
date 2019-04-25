// ==UserScript==
// @name         StackHelper
// @namespace    http://aperocky.com
// @version      1.0
// @description  Stackoverflow helper to make question *very* clear
// @author       Rocky Li
// @match        https://stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

function highlightTags() {
    let posttags = document.querySelectorAll("a.post-tag");
    // Tags you want to see/answer.
    let watchtags = new Set(["python", "pandas", "numpy", "algorithm", "python-requests", "flask",
                             "scipy", "multithreading", "matplotlib", "sklearn", "regex", "text",
                             "bash", "html", "list", "dictionary", "selenium", "beautifulsoup"]);
    // Tags you don't want to see/answer.
    let unwatch = new Set(["keras", "tensorflow", "android", "pygame", "pytorch",
                           "tkinter", "aws", "amazon-s3", "sympy", "php", "opencv",
                           "sql-server", "c#", "windows", "qt"]);
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
