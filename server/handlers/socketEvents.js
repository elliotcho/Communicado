
const {User} = require('../dbschema');

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
                const {firstName, lastName} = result;
    
                const userName = `${firstName} ${lastName}`;
    
                io.sockets.to(active[friendId])
                .emit('FRIEND_REQUEST', {...data, msg: `${userName} sent you a friend request`});
            });
        });
    });
}