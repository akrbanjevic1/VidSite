
const express = require("express");
const bcryptjs = require("bcryptjs");
const path = require('path');
const app = express();
const router = express.Router();
const { MongoClient } = require('mongodb');
var mongoose = require("mongoose");
const uri = "mongodb+srv://webtest:webtest@cluster0.ihwig.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var mongojs = require('mongojs')
global.db = mongojs(uri);

mongoose.Promise = global.Promise;
mongoose.connect(uri);
var Schema = mongoose.Schema;

//BCrypt stuff
const saltRounds = 10;

const hashFunction = (myPlainTextPassword) => {
    bcryptjs.genSalt(saltRounds, function(err, salt) {
        bcryptjs.hash(myPlainTextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            return hash;
        });
    })
};

const compareFunction = (myPlainTextPassword) => {
    bcryptjs.compare(myPlainTextPassword, testHash, function(err, result) {
        // result == 
        console.log(result);
    });
};

//Mongo Schema
var userSchema = new Schema({
    email: String, //this has to be the same as the name in the HTML file!
    hash: String
});

var User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/", router); //his has to come after all the prev app.use stuff! Now you can try wqorking on login.

router.get('/', (req, res) => {
    mongoose.connect(uri);
    res.sendFile('/home/akrbanj1998/Documents/Development/VidSite/public/index.html');
});

router.get('/registerPage', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

router.post('/register', (req,res) => {
    //console.log(req.body); used to test if body actually has anything
    var email = req.body.email;
    var password = req.body.password;
    var hash = bcryptjs.hashSync(password, saltRounds);
    var myData = new User({email, hash});
    myData.save()
    .then(item => {
    //res.send("item saved to database!"+item);
    console.log(hash);
    res.sendFile(__dirname + "/public/signupSuccess.html");
    })
    .catch(err => {
    res.send(err);
    console.log(err);
    });
});

router.post("/login", (req, res) => {
    var loginEmail = req.body.email;
    var loginPass = req.body.password;
    

    if(User.exists({email: loginEmail})) {
        User.exists({email: loginEmail}, async function (err, doc) {
            if (!err){
                var testUser = await User.findOne({ email: loginEmail });
                if(testUser === null) {
                    console.log("Error: account does not exist. Please register first!");
                    res.sendFile('/home/akrbanj1998/Documents/Development/VidSite/public/index.html');
                }
                else{
                    var testEmail = testUser.email;
                    var testUserHash = testUser.hash;
                    var hash = bcryptjs.hashSync(loginPass, saltRounds);
                    var hashResult = bcryptjs.compareSync(loginPass, testUserHash);
                    if(loginEmail === testUser.email && hashResult === true) {
                        console.log("Exists :", doc);
                        console.log(testEmail);
                        res.sendFile('/home/akrbanj1998/Documents/Development/VidSite/public/mainPage.html');
                    }
                    else {
                        console.log("TestUserHash"+testUserHash);
                        console.log("Hash"+hash);
                        console.log("Incorrect login!");
                    }
                }
            }else{
                console.log("Fatal system error has occurred :( Please try again!")  
                //alert(err); 
            }
        });
    }

    else {
        console.log("Error with login, perhaps account does not exist?");
    }

})

let port = process.env.PORT;
if(port == null || port =="") {
    port=3100;
}

app.listen(port, () => {
    console.log('Listening at: ${port}');
})

module.exports = router;