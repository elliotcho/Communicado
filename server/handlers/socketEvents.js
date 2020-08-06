const {User, Notification} = require('../dbschema');

const {declineReq, acceptReq, changeFriendStatus} = require('./friends');

const active = {};

module.exports = (io) => {
    io.on('connection', socket => {

        // JOIN SERVER --- store socket id
        socket.on('JOIN_SERVER', data =>{
            active[data.uid] = socket.id;
        });

        // DISCONNECT FROM SERVER --- delete socket id
        socket.on("DISCONNECT", data =>{
            delete active[data.uid];
        });
        
        // DECLINE REQUEST --- Remove notification from user
        socket.on("DECLINE_REQUEST", data => declineReq(data));

        // ACCEPT FRIEND REQUEST --- Store sender and recipient data from request
        socket.on("ACCEPT_REQUEST", async data =>{
            const msg = await acceptReq(data);
            // Send back msg returned from accepting
            io.sockets.to(active[data.senderId]).emit(
                'ACCEPT_REQUEST', 
                {msg}
            ); 
        });

        // CHANGE FRIEND STATUS --- acts as a friend request method
        socket.on("CHANGE_FRIEND_STATUS", async data =>{
            const msg = await changeFriendStatus(data)
            // Send back msg returned from updating friend status
            if ( msg ) {
                io.sockets.to(active[data.friendId]).emit(
                    'FRIEND_REQUEST', 
                    {msg}
                );
            }
        });
    });
}