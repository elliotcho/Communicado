const express= require("express");
const socket = require("socket.io");

// App Setup
const app = express();
//picking what port to run server
const server = app.listen(5000, ()=>{
    console.log("accepting requests");
});
// Setup server socket to handle messages 
const io= socket(server);
//connect to socket
io.on("connection", (socket)=>{
    console.log("made socket connection");
    // listen for message being sent from client
    socket.on("msg", (data)=>{
        io.sockets.emit("msg",data);
    });
});