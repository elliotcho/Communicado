const router = require('express').Router();

const {
    getUserFriends, 
    getFriendStatus
} = require('../controllers/friends');

router.get('/:uid', getUserFriends);
router.post('/status', getFriendStatus);

module.exports = router;