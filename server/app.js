const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const cors=require('cors');
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

app.use(bodyParser.json());
app.use(cors());

const { 
    login, 
    signup, 
    getUserInfo,
    handleProfilePic, 
    changeName,
    changePwd,
    findUsers
} = require('./handlers/users');

app.post('/', login);
app.post('/signup', signup);
app.post('/userinfo', getUserInfo);
app.post('/profilepic', handleProfilePic(upload, fs, path));
app.post('/changename', changeName);
app.post('/changepwd', changePwd);
app.post('/findusers', findUsers);

//Specify localhost port number
app.listen(5000);