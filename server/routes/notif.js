const router = require('express').Router();

const {
    readNotifs,
    checkUnreadNotifs
} = require('../controllers/notif');

router.put('/read/:uid', readNotifs);
router.get('/unread/:uid', checkUnreadNotifs);

module.exports = router;