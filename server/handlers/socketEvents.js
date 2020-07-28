
const {User, Notification} = require('../dbschema');

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
            const {receiverId, senderId} = data;
            //find receiver and add sender onto their friend's list
            User.findOne({_id: receiverId}).then(receiver =>{
                // If users are already friends, send notification
                // R: Will this ever run? can we send requests to a friend already? 
                if(receiver.friends.includes(senderId)){
                    io.sockets.to(active[senderId]).emit(
                        'ACCEPT_REQUEST', 
                        {msg: "You're already friends"}
                    ); 
                }
                // If users not already friends, store variables of receiver
                else{
                    const {firstName, lastName, friends, notifs} = receiver;
                    // Remove notification from recievers notif list
                    for(let i =0;i<notifs.length;i++){
                        if(notifs[i].senderId === senderId && notifs[i].friendRequest){
                            notifs.splice(i, 1);
                            break;
                        }
                    }
                    // Add user who sent request to friends list
                    friends.push(senderId);
                    // New notification to send to sender of acceptance
                    const newNotif = new Notification({
                        friendRequest: false,
                        read: false,
                        content: msg,
                        // Sender of acceptance is receiver who accepted it
                        senderId: receiverId,
                        date: new Date()
                    })
                    // Accept message for new notif for sender of friend request
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
                    });
                }
            });
        });
        // FRIEND REQUEST SENT --- send new notif to friend
        socket.on("FRIEND_REQUEST", data => {
            const {uid, friendId} = data;
            User.findOne({_id: uid}).then(result =>{
                const {firstName, lastName} = result;
                const msg = `sent you a friend request`;
                User.findOne({_id: friendId}).then(friend =>{
                    // Check users notifs to see if friend request was already sent
                    const {notifs} = friend;
                    let prevRequest = false;
                    for(let i =0;i<notifs.length;i++){
                        if(notifs[i].senderId === uid && notifs[i].friendRequest){
                            prevRequest = true;
                            break;
                        }
                    }                    
                    // If previous requenst, send msg response to client
                    if(prevRequest){
                        io.emit('FRIEND_REQUEST', {msg: "Request already has been sent."});
                    }
                    // If no previous request, continue creating notification
                    else{
                        const newNotification = new Notification({
                            friendRequest: true,
                            read: false,
                            content: msg,
                            senderId: uid,
                            date: new Date()
                        });
                        // Push new notification to friends notif 
                        notifs.push(newNotification);
                        // Update friends notifs and emit result msg
                        User.updateOne({_id: friendId}, {notifs}).then(() =>{
                            io.sockets.to(active[friendId]).emit(
                                'FRIEND_REQUEST', 
                                {msg: `${firstName} ${lastName} ${msg}`}
                            ); 
                        });
                    }
                });
            }); 
        });
    });
}