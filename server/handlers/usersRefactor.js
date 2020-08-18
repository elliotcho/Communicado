const {User} = require('../dbschema');

// Login function for user based on credentials
const login = async (req, res) => {
    // Find user based on email
    const result = await User.findOne({email: req.body.email})
        if(result === null) {
            // If no email found, inform user
            res.json({msg:"Email is not registred with Communicado"});
        } else {
            // If email found, verify email
            if(result.password === req.body.password){
                // Once verified, send User
                res.json({uid: result._id, msg:'Success'});
            }
            // If password is not correct
            else{res.json({ msg:"incorrect password" });}
        }
}

// Signup function for users.
const signup = async (req, res) => {
    // Confirm that passwords match
    if (req.body.password !== req.body.confirmPassword) {
        res.json({msg: "Passwords do not match, please try again"});
    } else {
        // Check if email is already being used by another user in DB
        const result = await User.findOne({email: req.body.email});
        if (result !== null) {
            res.json({msg: "Email is already being used by another account"});
        } else {
            // If email is new, create new User with given info
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                dateCreated: Date.now(),
                profilePic: null,
                friends: [],
                notifs: []
            });
            // Save user to DB and return it to access, along with confirmation msg
            await newUser.save()
            res.json({msg: 'Success', uid: result._id})
        }
    }
}

// Function to get user's info as json
const getUserInfo = async (req, res) =>{
    const result = await User.findOne({_id: req.body.uid})
    res.json(result);
}

// Function to change profile pic and add as current pic
const handleProfilePic = (upload, fs, path) => async (req, res) => {
    // Loading profile picture
    if (req.body.action === 'load') {
        // Find user
        const result = await User.findOne({_id: req.body.uid});
        // If no image, load basic avatar 
        if (result.profilePic === null){
            res.sendFile(path.join(__dirname, '../', 'images/avatar.jpg'));
        } 
        // Load img from user if not null 
        else {
            res.sendFile(path.join(__dirname, '../', `images/${result.profilePic}`));
        }
   }
   else {
        // Upload profile image    
        upload(req, res, err => {
            if(err){
                console.log(err);
            }

            // Find user and update its image
            const result = await User.findOne({_id: req.body.uid});
            if (result.profliePic !== null){
                fs.unlink(path.join(__dirname, '../', `images/${result.profilePic}`), err => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            // Update user
            await User.updateOne({_id: req.body}, {profilePic: req.file.filename});
            res.json({msg: 'Success'});
        });
    } 
}

// Changes a users same should it be provided
const changeName = async (req, res) => {
    const {uid, firstName, lastName} = req.body;

    // Last name given
    if (firstName === '' && lastName !== '') {
        await User.updateOne({_id: uid}, {lastName});
        const result = User.findOne({_id: uid});
        res.json({...result, msg: 'Your last name has been updated'});
    }

    // First name given
    else if (firstName !== '' && lastName === '') {
        await User.updateOne({_id: uid}, {firstName});
        const result = await User.findOne({_id: uid})
        res.json({...result, msg: 'Your first name has been updated'});
    }

    // Both names given
    else if (firstName !== '' && lastName !== ''){
        await User.updateOne({_id: uid}, {firstName, lastName})
        const result = await User.findOne({_id: uid})
        res.json({...result, msg: 'Your full name has been updated'});
    }

    // No input given
    else{
        res.json({msg: 'Both inputs are blank: your name has not been changed.'});
    }
}

// Changes a users password
const changePwd = async (req, res) =>{
    const {uid, currPwd, newPwd, confirmPwd} = req.body;
    // Check if passwords match
    if(newPwd !== confirmPwd){
        res.json({msg: 'New password does not match confirm password'});
    }

    else{
        // If user's password is incorrent, inform them
        const result = await User.findOne({_id: uid});

        if (result.password !== currPwd){
            res.json({msg: 'Your password is incorrect'});
        } else {
            // If old password is correct, successfully update password
            await User.updateOne({_id: uid}, {password: newPwd});
            res.json({msg: 'Your password has been changed'});
        }
    }
}

// Delete a user from the DB
const deleteUser = async (req,res) =>{
    const {uid} = req.body;
    await User.deleteOne({_id: uid});
    res.json({msg: 'Account is being deleted, press ok to continue.'});
}

// Find all users based on a given name
// Used to find new friends to add
const findUsers = async (req, res) =>{
    let {name} = req.body;
    let listOfNames = [];

    // No users found
    if (name.length === 0) {
        res.json({ msg: "No users found" });
    }

    // Check if user gave 1 or multiple words
    if (req.body.name.includes(" ")) {
        oneWord = false;
        split = name.split(" ");
        
        // convert to lowercase 
        for (let i=0 ; i < split.length ; i++) {
            listOfNames.push(split[i].toLowerCase());
        }
    }
    else {
        listOfNames.push(name.toLowerCase());
    }
    // Find all users and filter name
    const result = await User.find({});
    const users = [];
    for(let i=0; i < result.length; i++) {
        let userNames = `${result[i].firstName} ${result[i].lastName}`.split(" ");
        for(let j=0; j < userNames.length; j++) {
            let found = false;
            // Convert names of all users to lowercase when comparing 
            // If matching, add to array of found users
            for(let k=0; k < listOfNames.length; k++){
                if(userNames[j].toLowerCase().startsWith(listOfNames[k])){
                    users.push(result[i]);
                    found = true;
                    break;
                }
            }
            if(found){break;}
        }
    }
    res.json({users, msg: "Success, here are your users"});
}

// Gets all of a users friends
const getFriends = async (req, res) =>{
    const {uid} = req.params;
    // Find user and their friends list
    const user = await User.findOne({_id: uid})
    const {friends} = user;
    // Find all friends in friend list and send back
    const users = await User.find({_id: {$in: friends}})
    res.json(users);
}
 
// exports
module.exports = {
    login,
    signup,
    handleProfilePic,
    getUserInfo,
    changeName,
    changePwd,
    findUsers,
    deleteUser,
    getFriends
}