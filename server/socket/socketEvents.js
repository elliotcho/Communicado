const {declineReq, acceptReq, changeFriendStatus, getOnlineFriends} = require('./friends');
const {getRecipients} = require('./chat');

const active = {};
//io= socket(server) from app.js
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

            const {receiverId} = data;
            
            if(msg){
                io.sockets.to(active[data.senderId]).emit(
                    'ACCEPT_REQUEST', 
                    {toastId: receiverId}
                ); 
            }
        });

        socket.on("CHANGE_FRIEND_STATUS", async data =>{
            const msg = await changeFriendStatus(data)

            const {uid} = data;

            if(msg){
                io.sockets.to(active[data.friendId]).emit(
                    'FRIEND_REQUEST', 
                    {toastId: uid}
                );
            }
        });

        socket.on('GET_ONLINE_FRIENDS', async data =>{
            const friends = await getOnlineFriends(data, active);

            io.sockets.to(active[data.uid]).emit(
                'GET_ONLINE_FRIENDS',
                {friends}
            );
        });
  
        socket.on('GET_RECIPIENTS', async data =>{
            const queryResult = await getRecipients(data);
            
            const {uid} = data;

            io.sockets.to(active[uid]).emit(
                'GET_RECIPIENTS'
                ,{queryResult} 
            );
        });

        socket.on('CREATE_CHAT', async data =>{
            const {recipients, uid} = data;

            for(let i=0;i<recipients.length;i++){
                const id =recipients[i]._id;

                if(id !== uid){
                    io.sockets.to(active[id]).emit(
                        'CHAT_CREATED', {uid: id}
                    );
                }
            }
        });

        socket.on('NEW_MESSAGE', data => {
            const {chatId, members, newMessage} = data;

            for(let i =0;i<members.length;i++){
                io.sockets.to(active[members[i]]).emit(
                    'NEW_MESSAGE', {chatId, newMessage}
                );
            }
        });

        socket.on('IS_TYPING',data =>{
            const {uid, members,chatId} = data;

            for(let i=0;i<members.length;i++){
                io.sockets.to(active[members[i]]).emit(
                    'IS_TYPING', {chatId, uid}
                );
            }
        })
    });
}