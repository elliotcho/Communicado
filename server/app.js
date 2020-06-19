const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//this is how you import in javaScript
const { login } = require('./users.js');

const app = express();

mongoose.connect('mongodb+srv://elliot:pwd@cluster0-rga5i.azure.mongodb.net/Communicado?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log("Connected to Database");
}).on('error', err => {console.log(err)});

app.post('/',login)