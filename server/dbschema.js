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

// User Schema that shows the data that a user will have
const UserSchema = new schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateCreated: Date, 
    profilePic: String,
    friends: [String],
    notifs: [NotifSchema],
    chats: [String]
});

const MessageSchema = new mongoose.Schema({
    senderId: String,
    content: String,
    timeSent: Date,
    readBy: [String],
    seenBy: [String]
});

const ChatSchema = new mongoose.Schema({
    members: [String],
    createdAt: Date,
    createdBy: String,
    messages: [MessageSchema],
    timeOfLastMessage: Date
});

// Model objects after the schema and export
const User = mongoose.model('user', UserSchema);
const Notification = mongoose.model('notification', NotifSchema);
const Message = mongoose.model('message', MessageSchema);
const Chat = mongoose.model('chat', ChatSchema);

exports.User = User;
exports.Notification = Notification;
exports.Message = Message;
exports.Chat= Chat;