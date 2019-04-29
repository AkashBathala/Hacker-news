"use strict";

let array = [];
var DATA = (function () {
    topStories();
    // bestStories();
    // newStories();
    function topStories() {
        fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                array = myJson;
                for (let i = 0; i <= 5; i++) {
                    _getData(array[i]);
                }
            });
    }
    
    function bestStories(){
        let beststories =[]
        fetch(`https://hacker-news.firebaseio.com/v0/beststories.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                bestStories = myJson;
                for (let i = 0; i <= 5; i++) {
                    _getData(bestStories[i]);
                }
                
            });
    }
    function newStories(){
        let newStories
        fetch(`https://hacker-news.firebaseio.com/v0/beststories.json`).then(function(response){
            return response.json();
        }).then(function(myJson){
            newStories = myJson;
                for (let i = 0; i <= 5; i++) {
                    _getData(newStories[i]);
                }
        });
    }
    function _getData(id) {

        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                printdata(myJson)
            });
    }
    function getarray() {
        return array;

    }
    function printdata(myJson) {
        var t = document.createElement('ol');
        var by = document.createElement('li');
        var descendants = document.createElement('li');
        var id = document.createElement('li');
        var title=document.createElement('li');
        var kids = document.createElement('li');
        var score = document.createElement('li');
        var time = document.createElement('li');
        var type = document.createElement('li');
        var url = document.createElement('li');

        title.innerHTML=`title:${myJson.title}`
        by.innerHTML = ` by: ${myJson.by}`;
        descendants.innerHTML = ` descendants: ${myJson.by}`;
        id.innerHTML = ` id: ${myJson.id}`;
        kids.innerHTML = ` kids: ${myJson.kids}`;
        score.innerHTML = ` score: ${myJson.score}`;
        time.innerHTML = ` time: ${myJson.time}`;
        type.innerHTML = ` type: ${myJson.type}`;
        url.innerHTML = ` url: ${myJson.url}`;
        
        t.appendChild(by);
        t.appendChild(title)
        t.appendChild(descendants);
        t.appendChild(id);
        t.appendChild(kids);
        t.appendChild(score);
        t.appendChild(time);
        t.appendChild(type);
        t.appendChild(url);
        document.body.appendChild(t)
    }
    return {
        // data: data,
        getData: _getData,
        // bestStories:bestStories
    }
})()



// DATA.data()




// function getdata(id) {






    // for (let i = 0; i < 5; i++) {
    //     return () => {

    //         fetch(`https://hacker-news.firebaseio.com/v0/item/${array[i]}.json`)
    //             .then(function (response) {

    //                 return response.json();
    //             })
    //             .then(function (myJson) {
    //                 console.log(myJson);
    //             });
    //     }
    // }
// }

