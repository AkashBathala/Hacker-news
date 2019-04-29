"use strict";
let array = [];

fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
    .then(function (response) {

        return response.json();
    })
    .then(function (myJson) {
        array = myJson;

        for (let i = 0; i < 5; i++) {
            getdata(array[i]);
        }
    });

function getdata(id) {
    
    
    // return()=>{
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(function (response) {

            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
        });
    // }
}

// var t= document.createElement('ol');
// var li=document.createElement('li');
// li.innerHTML="asdasd"
// // t.appendChild(li)
// document.body.appendChild(t)