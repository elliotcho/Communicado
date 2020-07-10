const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create new User Schema that shows the data that a user will have
const UserSchema = new schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateCreated: Date, 
    profilePic: String,
    friends: [String]
});

const MessageSchema = new schema({
    sender_id: String,
    recipient_id: String,
    timeSent: Date,
    timeRead: Date,
    body: String,
    read: Boolean
})

const NotifSchema = new schema({
    friendRequest: Boolean,
    content: String,
    read: Boolean
})

// Model the User object after the schema and export the "User"
const User = mongoose.model('user', UserSchema);
const Message = mongoose.model('message', MessageSchema)
const Notification = mongoose.model('notification', NotifSchema)

exports.User = User;