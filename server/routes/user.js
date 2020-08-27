const router = require('express').Router();

const {
    login,
    signUp,
    getUserInfo,
    loadProfilePic,
    updateProfilePic,
    changeName,
    changePwd,
    deleteUser,
    findUsers
} = require('../controllers/user');

router.post('/login', login);
router.post('/signup', signUp);
router.get('/:uid', getUserInfo)
router.get('/profilepic/:uid', loadProfilePic);
router.post('/profilepic', updateProfilePic);
router.post('/changename', changeName);
router.post('/changepwd', changePwd);
router.delete('/:uid', deleteUser);
router.post('/search', findUsers);

module.exports = router;