const router = require('express').Router();

const { 
    createChat,
    getUserChats,
    getMemberNames,
    getChatMessages,
    getChatPic
 } = require('../controllers/chat');

router.post('/create', createChat);
router.get('/user/:uid', getUserChats);
router.post('/members', getMemberNames);
router.get('/messages/:chatId', getChatMessages);
router.post('/chatpic', getChatPic);

module.exports = router;