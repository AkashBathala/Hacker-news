"use strict";
let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
let topStoriesarray = [];
let bestStories = [];
let newStories = [];
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
                button.onclick = yhendler;
                document.getElementById('wrap').innerHTML = dloader;
            });
    }

    function bestStories() {
        let loader = `<div><h2>Please Wait while Data is Loading</h2></div>`;
        document.getElementById('wrap').innerHTML = loader;
        let load = 5;

        fetch(`https://hacker-news.firebaseio.com/v0/beststories.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                bestStories = myJson;
                arrayStoreData = bestStories;
                for (let i = 0; i <= load; i++) {
                    _getData(bestStories[i]);
                }
                let dloader = ``;
                document.getElementById('wrap').innerHTML = dloader;

            });
    }
    function newStories() {
        let loader = `<div><h2>Please Wait while Data is Loading</h2></div>`;
        document.getElementById('wrap').innerHTML = loader;

        let load = 5;

        fetch(`https://hacker-news.firebaseio.com/v0/beststories.json`).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            newStories = myJson;
            for (let i = 0; i <= load; i++) {
                _getData(newStories[i]);
            }
            let dloader = ``;
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
    function dataPrintFormat(x, y) {
        for (let i = x; i < y; i++) {
            // console.log(topStoriesarray[i] ,"i is",i,y);
            _getData(topStoriesarray[i]);
        }

    }
    async function printdata(myJson) {
        /** <table>
     * <tr>
        <td>
            <ol>
                <li>a</li>
                <li>b</li>
                <li>c</li>
                <li>d</li>
            </ol>
        </td>
    </tr>
    </table> */
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let ol = document.createElement('ol');
        let by = document.createElement('li');
        let descendants = document.createElement('li');
        let id = document.createElement('li');
        let title = document.createElement('li');
        let kids = document.createElement('li');
        let score = document.createElement('li');
        let time = document.createElement('li');
        let type = document.createElement('li');
        let url = document.createElement('li');

        table.id = "table";
        title.innerHTML = `title:${myJson.title}`
        by.innerHTML = ` by: ${myJson.by}`;
        descendants.innerHTML = ` descendants: ${myJson.by}`;
        id.innerHTML = ` id: ${myJson.id}`;
        kids.innerHTML = ` kids: ${myJson.kids}`;
        score.innerHTML = ` score: ${myJson.score}`;
        time.innerHTML = ` time: ${myJson.time}`;
        type.innerHTML = ` type: ${myJson.type}`;
        url.innerHTML = ` url: ${myJson.url}`;

        kids.id = "scrollable";
        url.id = "scrollable";

        tr.appendChild(td);
        td.appendChild(id);
        td.appendChild(title);
        td.appendChild(descendants);
        td.appendChild(by);
        td.appendChild(kids);
        td.appendChild(score);
        td.appendChild(time);
        td.appendChild(type);
        td.appendChild(url);
        table.appendChild(tr);
        document.getElementById('wrap').appendChild(table)
    }
    return {
        newStories: newStories,
        bestStories: bestStories,
        topStories: topStories,
        dataPrintFormat: dataPrintFormat
    }
})();
let starter = 10, round = 20;
function yhendler() {

    let wrap = document.getElementById('bodyid');
    let contentheight = wrap.offsetHeight;  //gets page content height
    let yoffset = window.scrollY;  //gets the vertical scroll positio
    let y = yoffset + window.innerHeight;

    if (y >= contentheight) {
        // document.getElementById('wrap').innerHTML += "<div>asdasdsd</div>";
        DATA.dataPrintFormat(starter, round);
        starter += 10;
        round += 10;
    }
    var status = document.getElementById('status');
    status.innerHTML = contentheight + "|" + y + "|" + window.pageYOffset + "|" + window.scrollY;
}

