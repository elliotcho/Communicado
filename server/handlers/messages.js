const {User, Chat, Message} = require('../dbschema');

const getRecipients = async (data) =>{
    const {uid,recipients, name} = data;
    const recipientIDs={}
    
    if(name.trim() === ''){
        return [];
    }

    for(let i=0;i<recipients.length;i++){
        recipientIDs[recipients[i]._id]=true
    }

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    let j = 0;

    const result = [];

    for(let i=0;i<friends.length && j<4;i++){
        const friend = await User.findOne({_id: friends[i]._id});

        let firstName = friend.firstName.split(" ").join("").toLowerCase();
        let lastName = friend.lastName.split(" ").join("").toLowerCase();
        
        let query = name.split(" ").join("").toLowerCase();

        if((firstName + lastName).startsWith(query) && !recipientIDs[friend._id]){
            result.push(friend);
            j++;
        }
    }

    return result;
}

const createChat = async (req, res) =>{
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

const getUserChats = async (req, res) =>{
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

const getMemberNames = async (req, res) =>{
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

const getChatMessages = async (req, res) =>{
    const {chatId} = req.params;

    if(chatId !== 'home' && chatId !== 'new'){
        const chat = await Chat.findOne({_id: chatId});
        const {messages} = chat;
    
        res.json(messages);
    }
}

module.exports = {
    getRecipients,
    createChat,
    getUserChats,
    getMemberNames,
    getChatMessages
}