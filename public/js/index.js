//console.log("Hello world!"); //This line is for testing if it is writing to the console :)
//From here, find a way to grab the user and pass from the index page and add to a DB. 

//Application has ability to go to register page now. If account is not in DB, then save and register.
//Should also make the website take the user back to the login page. 

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
function validateLogin(){
    //console.log(attempt); //testing console.log
    let username = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
        if (username === "test@email.com" && password === "test"){
            alert("Login Successful!");
            window.location = "success.html"; // Redirecting to other page.
            return false;
            }
        else{
            // Decrementing by one.
            alert("Incorrect Login: Attempts left: "+parseInt(attempt));
            alert(attempt);
            //console.log(attempt);
            // Disabling fields after 3 attempts.
        if(attempt === 0){
            document.getElementById("inputEmail").disabled = true;
            document.getElementById("inputPassword").disabled = true;
            document.getElementById("submitBttn").disabled = true;
            return false;
            }
        }
    }

//Below line is only client-side; does not work in NodeJS!
document.getElementById("submitBttn").addEventListener("click", validateLogin());