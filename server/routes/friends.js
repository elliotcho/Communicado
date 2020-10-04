const router = require('express').Router();

const {
    getUserFriends, 
    getFriendStatus,
    changeFriendStatus
} = require('../controllers/friends');

router.get('/:uid', getUserFriends);
router.post('/status', getFriendStatus);
router.post('/change', changeFriendStatus);


module.exports = router;