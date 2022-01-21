const express = require("express");
const path = require('path');
const app = express();
const port = 3100;
const router = express.Router();
const { MongoClient } = require('mongodb');
var mongoose = require("mongoose");
const uri = "mongodb+srv://webtest:webtest@cluster0.ihwig.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
mongoose.connect(uri);
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String, //this has to be the same as the name in the HTML file!
    password: String
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
    res.sendFile('/home/akrbanj1998/Documents/Development/VidSite/public/signup.html');
});

router.post('/register', (req,res) => {
    console.log(req.body);
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database!"+item);
    })
    .catch(err => {
    res.send(err);
    console.log(err);
    });
});

app.listen(port, () => {
    console.log('Listening at: ${port}');
})

module.exports = router;