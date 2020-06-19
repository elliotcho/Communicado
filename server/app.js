const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { login, signup } = require('./users');

const app = express();

mongoose.connect('mongodb+srv://elliot:pwd@cluster0-rga5i.azure.mongodb.net/Communicado?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log("Connected to Database");
}).on('error', err => {console.log(err);});

// Static build that uses a module to store data in req.body
app.use(express.static('../client/build'));
app.use(bodyParser.json());

// Serve index 
app.get('/', (req, res) => {
    res.sendFile('../client/build/index.html');
});

// 
app.post('/', login)
app.post('/signup', signup) 

//Specify localhost port number
app.listen(3000);
