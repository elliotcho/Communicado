const {User} = require('./dbschema');

//result is result of query, query is example User.findOne({})
const login = (req,res) => {
    // Find user based on email
    User.findOne({email: req.body.email}).then(result => {
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
            else{res.json({msg:"incorrect password"});}
        }
    });
}

// Signup function for users.
const signup = (req, res) => {
    // Confirm that passwords match
    if (req.body.password !== req.body.confirmPassword) {
        res.json({msg: "Passwords do not match, please try again"});
    } else {
        // Check if email is already being used by another user in DB
        User.findOne({email: req.body.email}).then(result => {
            if (result !== null) {
                res.json({msg: "Email is already being used by another account"});
            } else {
                // If email is new, create new User with given info
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    dateCreated: Date.now()
                });
                // Save user to DB and return it to access, along with confirmation msg
                newUser.save().then(result => {
                    res.json({msg: 'Success', uid: result._id})
                });
            }
        });
    }
}

const getUserInfo = (req, res) =>{
    User.findOne({_id: req.body.uid}).then(result =>{
        res.json({...result});
    });
}

const handleProfilePic = (upload, fs, path) => (req, res) =>{
   if(req.body.action === 'load'){
       User.findOne({_id: req.body.uid}).then(result =>{
            if(typeof result.profilePic === 'undefined'){
                res.sendFile(path.join(__dirname, 'images/avatar.jpg'));
            } 

            else{
                res.sendFile(path.join(__dirname, `images/${result.profilePic}`));
            }
       });
   }

   else{
        upload(req, res, err => {
            if(err){
                console.log(err);
            }

            User.findOne({_id: req.body.uid}).then(result =>{
                if(typeof result.profliePic ==='undefined'){
                    fs.unlink(path.join(__dirname, `images/${result.profilePic}`), err =>{
                        if(err){
                            console.log(err);
                        }
                    });
                }

                User.updateOne({_id: req.body.uid}, {profilePic: req.file.filename}).then(()=>{
                    res.json({msg: 'Success'});
                });
            });
        });
    }
}

const changeName = (req, res) => {
    const {uid, firstName, lastName} = req.body;

    if(firstName ==='' && lastName !== ''){
       User.updateOne({_id: uid}, {lastName}).then(() =>{
            User.findOne({_id: uid}).then(result =>{
                res.json({...result, msg: 'Your last name has been updated'});
            });
       });
    }

    else if(firstName !== '' && lastName ===''){
        User.updateOne({_id: uid}, {firstName}).then(() =>{
            User.findOne({_id: uid}).then(result =>{
                res.json({...result, msg: 'Your first name has been updated'});
            });
        });
    }

    else if(firstName !== '' && lastName !== ''){
        User.updateOne({_id: uid}, {firstName, lastName}).then(() =>{
            User.findOne({_id: uid}).then(result =>{
                res.json({...result, msg: 'Your full name has been updated'});
            });
        });
    }

    else{
        res.json({msg: 'Both inputs are blank: your name has not been changed.'});
    }
}

const changePwd = (req, res) =>{
    const {uid, currPwd, newPwd, confirmPwd} = req.body;

    if(newPwd !== confirmPwd){
        res.json({msg: 'New password does not match confirm password'});
    }

    else{
        User.findOne({_id: uid}).then(result=>{
            if(result.password !== currPwd){
                res.json({msg: 'Your current password is incorrect'});
            }

            else{
                User.updateOne({_id: uid}, {password: newPwd}).then(()=>{
                    res.json({msg: 'Your password has been changed'});
                });
            }
        });
    }
}

// exports
module.exports = {
    login,
    signup,
    handleProfilePic,
    getUserInfo,
    changeName,
    changePwd
}