const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MessageSchema = new schema({
    senderId: String,
    content: String,
    timeSent: Date,
    readBy: [String],
    seenBy: [String],
    image: String
});

const ChatSchema = new schema({
    members: [String],
    createdAt: Date,
    createdBy: String,
    messages: [MessageSchema],
    timeOfLastMessage: Date
});

const Message = mongoose.model('message', MessageSchema);
const Chat = mongoose.model('chat', ChatSchema);

exports.Message = Message;
exports.Chat= Chat;