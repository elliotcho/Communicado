const {User} = require('../models/user');
const {Message, Chat} = require('../models/chat');

exports.createMessage = async (req,res) =>{
    const {uid, content, chatId} = req.body;
    
    const chat = await Chat.findOne({_id:chatId});
    const {messages} = chat;

    const newMessage = new Message({
        senderId: uid,
        content,
        timeSent: new Date(),
        readBy: [uid],
        seenBy: [uid]
    });

    messages.push(newMessage);
    
    //first parameter finds what we are looking for second parameter is the new thing we are adding for whatever we found with first parametr
    await Chat.updateOne({_id:chatId},{messages, timeOfLastMessage: newMessage.timeSent});
    
    res.json(newMessage);
}

exports.createChat = async (req, res) =>{
    const {uid, recipients, content} = req.body;

    const members = recipients.map(user => user._id);

    //add user creating the chat as a member
    if(!members.includes(uid)){
        members.push(uid);
    }

    const newMessage = new Message({
        senderId: uid,
        content,
        timeSent: new Date(),
        readBy: [uid],
        seenBy: [uid]
    });

    const newChat = new Chat({
        members,
        createdAt: new Date(),
        createdBy: uid,
        messages: [newMessage],
        timeOfLastMessage: new Date()
    });

    const chat = await newChat.save();

    for(let i=0;i<members.length;i++){
        const user = await User.findOne({_id: members[i]});

        const {chats} = user;

        await User.updateOne({_id: members[i]}, {chats: [...chats, chat._id]});
    }

    res.json({chatId: chat._id});
}

exports.getUserChats = async (req, res) =>{
    const {uid} = req.params;

    let userChats = [];

    const user = await User.findOne({_id: uid});
    const {chats} = user;

    for(let i=0;i<chats.length;i++){
        const chat = await Chat.findOne({_id: chats[i]});
        userChats.push(chat);
    }

    userChats.sort((a, b) => b.timeOfLastMessage - a.timeOfLastMessage);

    res.json(userChats);
}

exports.getMemberNames =  async (req, res) =>{
    const {uid, chatId} = req.body;

    let result = '';

    const chat = await Chat.findOne({_id: chatId});
    const {members} = chat;

    members.splice(members.indexOf(uid), 1);
    
    for(let i=0;i<members.length;i++){
        const user = await User.findOne({_id: members[i]});

        const {firstName, lastName} = user;

        if(i === members.length - 1){
            result+=`${firstName} ${lastName}`;
        }

        else{
            result+=`${firstName} ${lastName}, `;
        }
    }

    res.json({memberNames: result});
}

exports.getChatMessages = async (req, res) =>{
    const {chatId} = req.params;

    if(chatId !== 'home' && chatId !== 'new'){
        const chat = await Chat.findOne({_id: chatId});
        const {messages} = chat;
    
        res.json(messages);
    }
}

exports.getChatMemberIds = async (req, res) =>{
    const {uid, chatId} = req.body;

    if(chatId !== 'home'){
        const chat = await Chat.findOne({_id: chatId});
        const {members} = chat;
    
        res.json({members: members.filter(id => id !== uid)});
    }
}

exports.checkForUnseenChats = async (req, res) => {
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const {chats} = user;

    let unseen = false;

    for(let i=0;i<chats.length;i++){
        const chat = await Chat.findOne({_id: chats[i]});
        const {messages} = chat;

        const n = messages.length;
 
        unseen |= !messages[n-1].seenBy.includes(uid);
    }

    res.json({unseen}); 
}

exports.seeChats = async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const {chats} = user;

    for(let i=0;i<chats.length;i++){
        const chat = await Chat.findOne({_id: chats[i]});
        const {messages} = chat;

        const n = messages.length;

        messages[n-1].seenBy.push(uid);

        await Chat.updateOne({_id: chats[i]}, {messages});
    }

    res.json({msg: "Chats seen"});
}

exports.readChat = async (req, res) => {
    const {chatId, uid} = req.body;

    const chat = await Chat.findOne({_id: chatId});
    const {messages} = chat;

    for(let i = 0; i < messages.length; i++){
        if(messages[i].readBy.includes(uid)){
            continue;
        }

        messages[i].readBy.push(uid);
    }

    await Chat.updateOne({_id: chatId}, {messages});

    res.json({msg: 'Success'});
}

