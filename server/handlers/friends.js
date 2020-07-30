const {User, Notification} = require('../dbschema');
const axios = require('axios');

// Async Function to decline a friend request
const declineReq = async (data) => {
    const {receiverId, senderId} = data;
    // Find receiver from ID
    const result = await User.findOne({_id: receiverId})
    const {notifs} = result;
    // Look for friend request sent by user
    for (let i = 0; i < notifs.length; i++) {
        if (notifs[i].senderId === senderId && notifs[i].friendRequest) {
            // Once found, remove notification and break
            notifs.splice(i, 1);
            break;
        }
    }
    await User.updateOne({ _id: receiverId}, {notifs})
}

// Async accept a friend request
const acceptReq = async (data) => {
    const {status, receiverId, senderId} = data;
    // Fetch status of friend request
    const response = await axios.post('http://localhost:5000/friends/status', {receiverId, senderId});

    if (status === response.data.status) {
        // Checks if friend request is pending
        if (status === 'Pending') {
            // Find receiver and destructure user
            const receiver = await User.findOne({_id: receiverId})
            const {firstName, lastName, friends, notifs} = receiver;

            // Find notification and remove from sender
            for (let i = 0; i < notifs.length; i++) {
                if (notifs[i].senderId === senderId && notifs[i].friendRequest) {
                    notifs.splice(i, 1);
                    break;
                }
            }

            // Add new notification list to user
            friends.push(senderId);

            // construct message for the sender
            const msg = `${firstName} ${lastName} accepted your friend request`;
            // Create new notif to send acceptance
            const newNotif = new Notification({
                friendRequest: false,
                read: false,
                content: msg,
                // Sender of acceptance is receiver who accepted it
                senderId: receiverId,
                date: new Date()
            });
            
            // Update receiver's friends and notifs
            await User.updateOne({_id: receiverId}, {friends, notifs})

            // Find sender and add receiver onto their friend's list
            const sender = await User.findOne({_id: senderId})
            const senderFriends = sender.friends;
            senderFriends.push(receiverId);
            // also add new notification to sender of acceptance
            const senderNotifs = sender.notifs;
            senderNotifs.push(newNotif);

            // Once accepted, remove notification from user who accepted 
            for (let i = 0; i < senderNotifs.length; i++) {
                if (senderNotifs[i].senderId === receiverId && senderNotifs[i].friendRequest) {
                    senderNotifs.splice(i, 1);
                    break;
                }
            }
            await User.updateOne({_id: senderId}, {friends: senderFriends, notifs: senderNotifs});
            // Emit new notification to socket and add 
            io.sockets.to(active[senderId]).emit(
                'ACCEPT_REQUEST', {
                    msg
                }
            );
        }
    }
}

const changeFriendStatus = async (data) => {
    const {uid, friendId, status} = data;
    // Fetch status of friend request
    const response = await axios.post('http://localhost:5000/friends/status', {senderId: uid, receiverId: friendId});

    if (status === response.data.status) {
        if (status === "Add Friend") {
            const result = await User.findOne({ _id: uid});
            const {firstName, lastName} = result;
            const msg = `sent you a friend request`;

            const user = await User.findOne({ _id: friendId});
            // Send possible friend a new friend request notification 
            const {notifs} = user;
            const newNotification = new Notification({
                friendRequest: true,
                read: false,
                content: msg,
                senderId: uid,
                date: new Date()
            });

            notifs.push(newNotification);
            
            // Update friends notifs
            await User.updateOne({_id: friendId}, {notifs});
            
            io.sockets.to(active[friendId]).emit(
                'FRIEND_REQUEST', 
                {msg: `${firstName} ${lastName} ${msg}`}
            );
        }
    } else if (status === "Pending") {
        const result = await User.findOne({_id: friendId})
        const {notifs} = result;

        // If already pending, cancel request and remove notif
        for(let i=0;i<notifs.length;i++){
            if(notifs[i].senderId === uid && notifs[i].friendRequest){
                notifs.splice(i, 1);
                break;
            }
        }
        // Update users notification list
        await User.updateOne({_id: friendId}, {notifs});



    } else {
        const result = await User.findOne({_id: uid});
        const {friends} = result;

        // Remove friend from friends list
        for(let i=0;i<friends.length;i++){
            if(friends[i] === friendId){
                friends.splice(i, 1);
                break;
            }
        }

        // Update friends list of user
        await User.updateOne({_id: uid}, {friends});

        // Remove current user from friends' list of friends
        const friend = await User.findOne({_id: friendId})
        const {friends} = friend;

        // Remove friend from friends list
        for(let i=0;i<friends.length;i++){
            if(friends[i] === friendId){
                friends.splice(i, 1);
                break;
            }
        }
        // Update friends list of user who is removed
        await User.updateOne({_id: friendId}, {friends})
    }
}

module.exports = {
    declineReq,
    acceptReq,
    changeFriendStatus
}