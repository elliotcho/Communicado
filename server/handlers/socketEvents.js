const {User, Notification} = require('../dbschema');

const axios = require('axios');

const active = {};

module.exports = (io) => {
    io.on('connection', socket =>{
        // JOIN SERVER --- store socket id
        socket.on('JOIN_SERVER', data =>{
            active[data.uid] = socket.id;
        });
        // DISCONNECT FROM SERVER --- delete socket id
        socket.on("DISCONNECT", data =>{
            delete active[data.uid];
        });
        // DECLINE REQUEST --- Remove notification from user
        socket.on("DECLINE_REQUEST", data =>{
            const {receiverId, senderId} = data;
            // Find receiver from ID
            User.findOne({_id: receiverId}).then(result =>{
                const {notifs} = result;
                // Look for friend request sent by user
                for(let i =0;i<notifs.length;i++){
                    if(notifs[i].senderId === senderId && notifs[i].friendRequest){
                        // Once found, remove notification and break
                        notifs.splice(i, 1);
                        break;
                    }
                }
            }); 
        });
        // ACCEPT FRIEND REQUEST --- Store sender and recipient data from request
        socket.on("ACCEPT_REQUEST", data =>{
            const {status, receiverId, senderId} = data;

            axios.post('http://localhost:5000/friends/status', {receiverId, senderId}).then(response =>{
                if(status === response.data.status){
                    if(status === 'Pending'){
                        User.findOne({_id: receiverId}).then(receiver =>{
                            const {firstName, lastName, friends, notifs} = receiver;

                            for(let i =0;i<notifs.length;i++){
                                if(notifs[i].senderId === senderId && notifs[i].friendRequest){
                                    notifs.splice(i, 1);
                                    break; 
                                }
                            }

                            friends.push(senderId);
                          
                            const newNotif = new Notification({
                                friendRequest: false,
                                read: false,
                                content: msg,
                                // Sender of acceptance is receiver who accepted it
                                senderId: receiverId,
                                date: new Date()
                            });
                        
                
                            //construct message for the sender
                            const msg = `${firstName} ${lastName} accepted your friend request`;
                          
                           
                
                                      // Update receiver's friends and notifs
                        User.updateOne({_id: receiverId}, {friends, notifs}).then(() => {
                        //find sender and add receiver onto their friend's list
                        User.findOne({_id: senderId}).then(sender =>{
                            const senderFriends = sender.friends;
                            senderFriends.push(receiverId);

                            // also add new notification to sender of acceptance
                            const senderNotifs = sender.notifs;
                            senderNotifs.push(newNotif);

                            //update sender's friends and notifs with acceptance results
                            User.updateOne({_id: senderId}, {friends: senderFriends, notifs: senderNotifs}).then(() => { 
                                // Emit new notification to socket and add 
                                io.sockets.to(active[senderId]).emit(
                                    'ACCEPT_REQUEST', 
                                    {msg}
                                ); 
                            });
                        });
                    }
                }
            });
        });
    
        socket.on("CHANGE_FRIEND_STATUS", data =>{
            const {uid, friendId, status} = data;

            axios.post('http://localhost:5000/friends/status', {senderId: uid, receiverId: friendId}).then(response=>{
                if(status === response.data.status){
                    if(status === 'Add Friend'){
                        User.findOne({_id: uid}).then(result =>{
                            const {firstName, lastName} = result;
                
                            const msg = `sent you a friend request`;
            
                            User.findOne({_id: friendId}).then(user =>{
                                const {notifs} = user;
            
                                let prevRequest = false;
            
                                for(let i =0;i<notifs.length;i++){
                                    if(notifs[i].senderId === uid && notifs[i].friendRequest){
                                        prevRequest = true;
                                        break;
                                    }
                                }                    
                    
                                if(prevRequest){
                                    io.emit('FRIEND_REQUEST', {msg: "Request already has been sent."});
                                }
            
                                else{
                                    const newNotification = new Notification({
                                        friendRequest: true,
                                        read: false,
                                        content: msg,
                                        senderId: uid,
                                        date: new Date()
                                    });
                
                                    notifs.push(newNotification);
                
                                    User.updateOne({_id: friendId}, {notifs}).then(() =>{
                                            io.sockets.to(active[friendId]).emit(
                                                'FRIEND_REQUEST', 
                                                {msg: `${firstName} ${lastName} ${msg}`}
                                            ); 
                                    });
                                }
                            });
                        }); 
                    }

                    else if(status === 'Pending'){
                        User.findOne({_id: friendId}).then(result =>{
                            const {notifs} = result;

                            for(let i=0;i<notifs.length;i++){
                                if(notifs[i].senderId === uid && notifs.friendRequest){
                                    notifs.splice(i, 1);
                                    break;
                                }
                            }

                            User.updateOne({_id: friendId}, {notifs}).then(()=>{});
                        });
                      
                    }
                    // If no previous request, continue creating notification
                    else{
                        User.findOne({_id: uid}).then(result =>{
                            const {friends} = result;

                            for(let i=0;i<friends.length;i++){
                                if(friends[i] === friendId){
                                    friends.splice(i, 1);
                                    break;
                                }
                            }

                            User.updateOne({_id: uid}, {friends}).then(()=>{});
                        });

                        User.findOne({_id: friendId}).then(result =>{
                            const {friends} = result;

                            for(let i=0;i<friends.length;i++){
                                if(friends[i] === uid){
                                    friends.splice(i, 1);
                                    break;
                                }
                            }

                            User.updateOne({_id: friendId}, {friends}).then(()=>{});
                        });
                    }
                }
            });
        });
    });
}