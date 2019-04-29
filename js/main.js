"use strict";


var DATA = (function() {    
    let array = [];

    function data() {
    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            array = myJson;
        });
    }
    function _getData(id) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
            });
    }
    return {
        // data: data,
        getData:_getData

    }
})()

DATA.data()
DATA.getData();

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

// var t= document.createElement('ol');
// var li=document.createElement('li');
// li.innerHTML="asdasd"
// // t.appendChild(li)
// document.body.appendChild(t)