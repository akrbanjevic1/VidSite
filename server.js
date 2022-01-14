const express = require("express");
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();
const { MongoClient } = require('mongodb');
var mongoose = require("mongoose");

const uri = "mongodb+srv://webtest:webtest@cluster0.ihwig.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
mongoose.connect(uri);

var userSchema = new mongoose.Schema({
    email: String, //this has to be the same as the name in the HTML file!
    password: String
});

var User = mongoose.model("User", userSchema);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/', (req, res) => {
    mongoose.connect(uri);
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.post('/register', (req,res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database"+myData);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

app.use("/", router);

app.listen(port, () => {
    console.log('Listening at: ${port}');
})