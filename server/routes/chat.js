const router = require('express').Router();

const { 
    createChat,
    getUserChats,
    getMemberNames,
    getChatMessages,
    sendMessage
 } = require('../controllers/chat');

router.post('/create', createChat);
router.get('/user/:uid', getUserChats);
router.post('/members', getMemberNames);
router.get('/messages/:chatId', getChatMessages);
router.post('/send', sendMessage);
module.exports = router;