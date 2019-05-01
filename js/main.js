"use strict";

let topStories = [];
let bestStories = [];
let newStories = [];
let arrayStoreData = [];
let DATA = (function () {

    function topStories(load) {

        let loader = `<div><h2>Please Wait while Data is Loading</h2></div>`;
        document.getElementById('wrap').innerHTML = loader;

        fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {

                topStories = myJson;

                for (let i = 0; i <= load; i++) {
                    _getData(topStories[i]);
                }
                let dloader = ``;
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
    function _getData(id) {


        arrayStoreData.push(id);
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                printdata(myJson)


            });
    }
    function printdata(myJson) {
        /**<table>
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
        let ol=document.createElement('ol');
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
        kids.id="scrollable";
        url.id="scrollable";


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
        topStories: topStories
    }
})()