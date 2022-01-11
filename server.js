const express = require("express");
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.post('/login', (req,res) => {
    res.send(req.body.email);
    console.log(req.body.email);
});

app.use("/", router);

app.listen(port, () => {
    console.log('Listening at: ${port}');
})