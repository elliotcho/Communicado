const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Notification Schema
const NotifSchema = new schema({
    friendRequest: Boolean,
    acceptFriendRequest: Boolean,
    content: String,
    read: Boolean,
    senderId: String,
    receiverId: String, 
    date: Date
});

const Notification = mongoose.model('notification', NotifSchema);

exports.NotifSchema = NotifSchema;
exports.Notification = Notification;