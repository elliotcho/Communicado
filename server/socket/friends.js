const {Notification} = require('../models/notif');
const {User} = require('../models/user');

const axios = require('axios');

// Async Function to decline a friend request
exports.declineReq = async (data) => {
    const {receiverId, senderId} = data;
    // Find receiver from ID
    const result = await User.findOne({_id: receiverId})
    const {notifs} = result;
    // Look for friend request sent by user
    for (let i = 0; i < notifs.length; i++) {
        if (notifs[i].senderId === senderId && notifs[i].friendRequest) {

            //delete from collection of notifications as well
            await Notification.deleteOne({_id: notifs[i]._id});

            // Once found, remove notification and break
            notifs.splice(i, 1);
            break;
        }
    }

    await User.updateOne({ _id: receiverId}, {notifs})
}

// Async accept a friend request
exports.acceptReq = async (data) => {
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

                    //delete from collection of notifications as well
                    await Notification.deleteOne({_id: notifs[i]._id});

                    notifs.splice(i, 1);
                    break;
                }
            }

            // Add new notification list to user
            friends.push(senderId);

            // construct message for the sender
            const msg = `accepted your friend request`;
            // Create new notif to send acceptance
            const newNotif = new Notification({
                friendRequest: false,
                acceptFriendRequest: true,
                read: false,
                content: msg,
                // Sender of acceptance is receiver who accepted it
                senderId: receiverId,
                receiverId: senderId,
                date: new Date()
            });

            //store new notif in notification collection
            await newNotif.save();
            
            // Update receiver's friends and notifs
            await User.updateOne({_id: receiverId}, {friends, notifs})

            // Find sender and add receiver onto their friend's list
            const sender = await User.findOne({_id: senderId})
            const senderFriends = sender.friends;
            senderFriends.push(receiverId);


            // also add new notification to sender of acceptance
            const senderNotifs = sender.notifs;
            senderNotifs.push(newNotif);

            // handles the case where they both sent each other friend requests
            // deletes the other user's friend request
            for (let i = 0; i < senderNotifs.length; i++) {
                if (senderNotifs[i].senderId === receiverId && senderNotifs[i].friendRequest) {

                    //delete from collection of notifications as well
                    await Notification.deleteOne({_id: senderNotifs[i]._id});

                    senderNotifs.splice(i, 1);
                    break;
                }
            }

            await User.updateOne({_id: senderId}, {friends: senderFriends, notifs: senderNotifs});
            return `${firstName} ${lastName} ${msg}`;
        }
    }
}

exports.getOnlineFriends = async (data, active) =>{
    const {uid} = data;

    const activeFriends = [];

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    for(let i=0;i<friends.length;i++){
        if(active[friends[i]._id]){
            activeFriends.push(friends[i]);
        }
    }

    return activeFriends;
}
