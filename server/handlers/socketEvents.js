
const {User, Notification} = require('../dbschema');

const active = {};

module.exports = (io) => {
    io.on('connection', socket =>{
        socket.on('JOIN_SERVER', data =>{
            active[data.uid] = socket.id;
        });
    
        socket.on("DISCONNECT", data =>{
            delete active[data.uid];
        });
    
        socket.on("FRIEND_REQUEST", data =>{
            const {uid, friendId} = data;
    
            User.findOne({_id: uid}).then(result =>{
                const {_id} = result;
    
                const msg = `sent you a friend request`;
    
                const newNotification = new Notification({
                    friendRequest: true,
                    read: false,
                    content: msg,
                    senderId: _id,
                    receiverId: friendId,
                    date: new Date()
                });

                newNotification.save().then(() =>{
                    io.sockets.to(active[friendId]).emit(
                        'FRIEND_REQUEST', 
                        {msg}
                    ); 
                });
            }); 
        });
    });
}