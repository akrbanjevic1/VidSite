//console.log("Hello world!"); //This line is for testing if it is writing to the console :)
//From here, find a way to grab the user and pass from the index page and add to a DB. 

//Can also work on implementing alerts in this (index.js) file if info is incorrect...

"use strict"
const bcryptjs = require("bcryptjs");

const saltRounds = 10; 
const myPlainTextPassword = "timisfunny";
let testHash = "";
var attempt= 3; 

function getAttempt() {
    console.log(attempt);
}

const hashFunction = () => {
    bcryptjs.genSalt(saltRounds, function(err, salt) {
        bcryptjs.hash(myPlainTextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            testHash = hash;
            console.log("Hash: "+hash);
            console.log(testHash);
        });
    })
};

const compareFunction = () => {
    bcryptjs.compare(myPlainTextPassword, testHash, function(err, result) {
        // result == 
        console.log(result);
    });
};

// Below function Executes on click of login button.
function alertLogin(){

}

//Below line is only client-side; does not work in NodeJS!
//document.getElementById("submitBttn").addEventListener("click", alertLogin());