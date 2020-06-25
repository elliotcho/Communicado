const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const express = require('express');
const app = express();

//connect to database
mongoose.connect('mongodb+srv://elliot:pwd@cluster0-rga5i.azure.mongodb.net/Communicado?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log("Connected to Database");
}).on('error', err => {console.log(err);});

//set up image storage
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) =>{
        cb(null, 'PROFILE-' + req.body.id + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 1000000000}
}).single('image');

// Static build that uses a module to store data in req.body
app.use(express.static('../client/build'));
app.use(bodyParser.json());

// Serve index 
app.get('/', (req, res) => {
    res.sendFile('../client/build/index.html');
});

const { 
    login, 
    signup, 
    handleProfilePic, 
    changeName
} = require('./users');

app.post('/', login);
app.post('/signup', signup);
app.post('/profilepic', handleProfilePic(upload, fs, path));
app.post('/changename', changeName);

//Specify localhost port number
app.listen(3000);