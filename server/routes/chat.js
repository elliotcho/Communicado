const router = require('express').Router();

const { 
    createChat,
    getUserChats,
    getMemberNames,
    getChatMessages,
    createMessage,
    getChatMemberIds,
    checkForUnseenChats,
    seeChats
 } = require('../controllers/chat');

router.post('/create', createChat);
router.get('/user/:uid', getUserChats);
router.post('/members', getMemberNames);
router.get('/messages/:chatId', getChatMessages);
router.post('/message', createMessage);
router.post('/memberids', getChatMemberIds);
router.get('/unseen/:uid', checkForUnseenChats);
router.put('/seechats/:uid', seeChats);

module.exports = router;