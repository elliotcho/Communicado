const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//used for image uplaoding
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const cors=require('cors');
const express = require('express');
const app = express();
const socket = require('socket.io');

//connect to database
mongoose.connect('mongodb+srv://elliot:pwd@cluster0-rga5i.azure.mongodb.net/Communicado?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); 

// Open Connection to database
mongoose.connection.once('open', () => {
    console.log("Connected to Database");
}).on('error', err => {console.log(err);});

// Set up image storage into images folder
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) =>{
        cb(null, 'PROFILE-' + req.body.uid + Date.now() + path.extname(file.originalname));
    }
});
// Use multer to upload imgs
const upload = multer({
    storage,
    limits: {fileSize: 1000000000}
}).single('image');

app.use(bodyParser.json());
app.use(cors());


// User functions
const { 
    login, 
    signup, 
    getUserInfo,
    handleProfilePic, 
    changeName,
    changePwd,
    findUsers,
    deleteUser,
    getFriends
} = require('./handlers/users');

// Notification Functions
const {
    readNotifs,
    checkUnreadNotifs,
    getFriendStatus
} = require('./handlers/notifications');

const {
    createChat,
    getUserChats,
    getMemberNames
} = require('./handlers/messages');

// User funtional routes 
//if client makes post request to local host, run this function
app.post('/', login)
app.post('/signup', signup);
app.post('/userinfo', getUserInfo);
app.post('/profilepic', handleProfilePic(upload, fs, path));
app.post('/changename', changeName);
app.post('/changepwd', changePwd); 
app.post('/findusers', findUsers);
app.post('/deleteUser', deleteUser); 
 
// Friend Functional Routes
app.get('/friends/:uid', getFriends);
app.post('/friends/status', getFriendStatus);

// Notification functional routes
app.put('/notifs/:uid', readNotifs);
app.get('/unreadnotifs/:uid', checkUnreadNotifs);

//chat/message functional routes
app.post('/chats/create', createChat);
app.get('/chats/user/:uid', getUserChats);
app.post('/chats/members', getMemberNames);

//Specify localhost port number
const server = app.listen(5000);


//Here we pass socket server as a parameter to the arrow io function in socketEvents
require('./handlers/socketEvents')(socket(server));