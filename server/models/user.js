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

const User = mongoose.model('user', UserSchema);
exports.User = User;