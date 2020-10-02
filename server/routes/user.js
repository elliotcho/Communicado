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

const {User} = require('../models/user');
router.post('/test', async (req, res) => {
    const {uid, pwd} = req.body;

    await User.updateOne({_id: uid}, {password: pwd});

    res.json({msg: "DONE"});
});

module.exports = router;