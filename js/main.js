"use strict";
let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
let topStoriesarray = [];
let bestStoriesarray = [];
let newStoriesarray = [];
let arrayStoreData = [];


let DATA = (function () {

    function topStories() {
        let loader = `<div><h2>Please Wait while Data is Loading</h2></div>`;
        document.getElementById('wrap').innerHTML = loader;
        fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {

                myJson.forEach(d => topStoriesarray.push(d));
                console.log(topStoriesarray);
                for (let i = 0; i < 10; i++) {
                    _getData(topStoriesarray[i]);
                    console.log("in top stories", topStoriesarray[i]);
                }
                let dloader = ``;
                let button = document.createElement('button');
                button.innerHTML = "Load More";
                document.getElementById('button').appendChild(button);
                button.onclick = topStoryhendler;
                document.getElementById('wrap').innerHTML = dloader;
            });
    }

    function bestStories() {
        let loader = `<div><h2>Please Wait while Data is Loading</h2></div>`;
        document.getElementById('wrap').innerHTML = loader;


        fetch(`https://hacker-news.firebaseio.com/v0/beststories.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                myJson.forEach(d => bestStoriesarray.push(d));
                console.log(bestStoriesarray);
                for (let i = 0; i < 10; i++) {
                    _getData(bestStoriesarray[i]);
                    console.log("in top stories", bestStoriesarray[i]);
                }
                let dloader = ``;
                let button = document.createElement('button');
                button.innerHTML = "Load More";
                document.getElementById('button').appendChild(button);
                button.onclick = bestStoryhendler;
                document.getElementById('wrap').innerHTML = dloader;
            });
    }
    function newStories() {
        let loader = `<div><h2>Please Wait while Data is Loading</h2></div>`;
        document.getElementById('wrap').innerHTML = loader;
        fetch(`https://hacker-news.firebaseio.com/v0/beststories.json`).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            myJson.forEach(d => newStoriesarray.push(d));
            console.log(newStoriesarray);
            for (let i = 0; i < 10; i++) {
                _getData(newStoriesarray[i]);
                console.log("in top stories", newStoriesarray[i]);
            }
            let dloader = ``;
            let button = document.createElement('button');
            button.innerHTML = "Load More";
            document.getElementById('button').appendChild(button);
            button.onclick = newStoryhendler;
            document.getElementById('wrap').innerHTML = dloader;
        });
    }
    async function _getData(id) {

        console.log("in getdata", id);


        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (singaldata) {
                printdata(singaldata);
                console.log("avfter fetch in get data", id);
                // console.log("in getdata",singaldata);
            });
    }
    function topStoryPrinter(x, y) {
        for (let i = x; i < y; i++) {
            // console.log(topStoriesarray[i] ,"i is",i,y);
            _getData(topStoriesarray[i]);
        }
    }
    function bestStoryPrinter(x, y) {
        for (let i = x; i < y; i++) {
            // console.log(topStoriesarray[i] ,"i is",i,y);
            _getData(bestStoriesarray[i]);
        }
    }
    function newStoryPrinter(x, y) {
        for (let i = x; i < y; i++) {
            // console.log(topStoriesarray[i] ,"i is",i,y);
            _getData(newStoriesarray[i]);
        }
    }
    async function printdata(myJson) {
        /**<table>
            <tr>
                <td>
                        <span>a</span>
                        <span>a</span>
                        <span>a</span>
                        <span>a</span>
                </td>
            </tr>
        </table>*/
        let table = document.createElement('table');
        let icon=document.createElement('i');
        let tr = document.createElement('tr');
        let tr2 = document.createElement('tr');
        let td = document.createElement('td');
        let div = document.createElement('div');
        let by = document.createElement('span');
        let descendants = document.createElement('span');
        let id = document.createElement('span');
        let title = document.createElement('span');
        let kids = document.createElement('span');
        let score = document.createElement('span');
        let time = document.createElement('span');
        let type = document.createElement('span');
        let url = document.createElement('span');
        let column=document.createElement('span');

        table.id = "table";
        icon.className =" fa fa-external-link";
        title.innerHTML = `${myJson.title}`
        by.innerHTML = ` By: ${myJson.by}`;
        descendants.innerHTML = `descendants: ${myJson.by}`;
        id.innerHTML = ` id: ${myJson.id}`;
        kids.innerHTML = ` Other: ${myJson.kids}`;
        score.innerHTML = ` score: ${myJson.score}`;
        time.innerHTML = ` time: ${myJson.time}`;
        type.innerHTML = ` type: ${myJson.type}`;
        url.innerHTML = ` reference: <a  href="${myJson.url}">${myJson.url}</a>`;

        id.id="id";
        by.id="by";
        tr.id='row';
        descendants.id='descendants';
        score.id="score";
        kids.id = "scrollable";
        kids.className="kids";
        url.id = "scrollable";
        url.className="url";
        tr2.id="grid1";
        div.id="grid";
        time.id="time";
        title.id="title";
        icon.id="iconleft";
    

        tr2.appendChild(title);
        tr2.appendChild(icon);
        tr.appendChild(td);
        td.appendChild(div)
        div.appendChild(id);
        div.appendChild(descendants);
        div.appendChild(by);
        div.appendChild(kids);
        // div.appendChild(score);
        // div.appendChild(time);
        div.appendChild(url);
        table.appendChild(tr2);
        table.appendChild(tr);

        document.getElementById('wrap').appendChild(table)
    }
    return {
        newStories: newStories,
        bestStories: bestStories,
        topStories: topStories,
        topStoryPrinter: topStoryPrinter,
        bestStoryPrinter: bestStoryPrinter,
        newStoryPrinter: newStoryPrinter
    }
})();
let starter = 10, round = 20;
function topStoryhendler() {

    let wrap = document.getElementById('bodyid');
    let contentheight = wrap.offsetHeight;  //gets page content height
    let yoffset = window.scrollY;  //gets the vertical scroll positio
    let y = yoffset + window.innerHeight;
    if (y >= contentheight) {
        DATA.topStoryPrinter(starter, round);
        starter += 10;
        round += 10;
    }
    // var status = document.getElementById('status');
    // status.innerHTML = contentheight + "|" + y + "|" + window.pageYOffset + "|" + window.scrollY;
}
function bestStoryhendler() {

    let wrap = document.getElementById('bodyid');
    let contentheight = wrap.offsetHeight;  //gets page content height
    let yoffset = window.scrollY;  //gets the vertical scroll positio
    let y = yoffset + window.innerHeight;
    if (y >= contentheight) {
        DATA.bestStoryPrinter(starter, round);
        starter += 10;
        round += 10;
    }

    // var status = document.getElementById('status');
    // status.innerHTML = contentheight + "|" + y + "|" + window.pageYOffset + "|" + window.scrollY;
}
function newStoryhendler() {

    let wrap = document.getElementById('bodyid');
    let contentheight = wrap.offsetHeight;  //gets page content height
    let yoffset = window.scrollY;  //gets the vertical scroll positio
    let y = yoffset + window.innerHeight;
    if (y >= contentheight) {
        DATA.newStoryPrinter(starter, round);
        starter += 10;
        round += 10;
    }

}