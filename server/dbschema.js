const mongoose = require('mongoose');
const schema = mongoose.Schema;

// User Schema that shows the data that a user will have
const UserSchema = new schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateCreated: Date, 
    profilePic: String,
    friends: [String]
});

// Message Schema, has sender and recipient ID
const MessageSchema = new schema({
    sender_id: String,
    recipient_id: String,
    timeSent: Date,
    timeRead: Date,
    body: String,
    read: Boolean
})

// Notification Schema
const NotifSchema = new schema({
    friendRequest: Boolean,
    content: String,
    read: Boolean,
    senderId: String,
    receiverId: String,
    date: Date
})

// Model objects after the schema and export
const User = mongoose.model('user', UserSchema);
const Message = mongoose.model('message', MessageSchema)
const Notification = mongoose.model('notification', NotifSchema)

exports.User = User;
exports.Notification = Notification;