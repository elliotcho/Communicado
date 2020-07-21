const {User} = require('../dbschema');

// result is result of query, query is example User.findOne({})
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
                    dateCreated: Date.now(),
                    profilePic: null,
                    friends: []
                });

                // Save user to DB and return it to access, along with confirmation msg
                newUser.save().then(result => {
                    res.json({msg: 'Success', uid: result._id})
                });
            }
        });
    }
}
// Function to get user's info as json
const getUserInfo = (req, res) =>{
    User.findOne({_id: req.body.uid}).then(result =>{
        res.json({result});
    });
}

// Function to change profile pic and add as current pic
const handleProfilePic = (upload, fs, path) => (req, res) =>{
   if(req.body.action === 'load'){
       User.findOne({_id: req.body.uid}).then(result =>{
            if(result.profilePic === null){
                res.sendFile(path.join(__dirname, '../', 'images/avatar.jpg'));
            } 

            else{
                res.sendFile(path.join(__dirname, '../', `images/${result.profilePic}`));
            }
       });
   }
   else{
        upload(req, res, err => {
            if(err){
                console.log(err);
            }

            User.findOne({_id: req.body.uid}).then(result =>{
                if(result.profliePic !== null){
                    fs.unlink(path.join(__dirname, '../', `images/${result.profilePic}`), err =>{
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
// Changes a users same should it be provided
const changeName = (req, res) => {
    const {uid, firstName, lastName} = req.body;
    // Last name given
    if(firstName ==='' && lastName !== ''){
       User.updateOne({_id: uid}, {lastName}).then(() =>{
            User.findOne({_id: uid}).then(result =>{
                res.json({...result, msg: 'Your last name has been updated'});
            });
       });
    }
    // First name given
    else if(firstName !== '' && lastName ===''){
        User.updateOne({_id: uid}, {firstName}).then(() =>{
            User.findOne({_id: uid}).then(result =>{
                res.json({...result, msg: 'Your first name has been updated'});
            });
        });
    }
    // Both names given
    else if(firstName !== '' && lastName !== ''){
        User.updateOne({_id: uid}, {firstName, lastName}).then(() =>{
            User.findOne({_id: uid}).then(result =>{
                res.json({...result, msg: 'Your full name has been updated'});
            });
        });
    }
    // No input given
    else{
        res.json({msg: 'Both inputs are blank: your name has not been changed.'});
    }
}

// Changes a users password
const changePwd = (req, res) =>{
    const {uid, currPwd, newPwd, confirmPwd} = req.body;
    // Check if passwords match
    if(newPwd !== confirmPwd){
        res.json({msg: 'New password does not match confirm password'});
    }

    else{
        // If user's password is incorrent, inform them
        User.findOne({_id: uid}).then(result=>{
            if(result.password !== currPwd){
                res.json({msg: 'Your password is incorrect'});
            }
            // If old password is correct, successfully update password
            else{
                User.updateOne({_id: uid}, {password: newPwd}).then(()=>{
                    res.json({msg: 'Your password has been changed'});
                });
            }
        });
    }
}


//delete
const deleteUser = (req,res) =>{
    const {uid} = req.body
    console.log(uid)
    User.deleteOne({_id: uid}).then(()=>{
        res.json({msg: 'Account is being deleted, press ok to continue.'});

    })
}

=======
// Find all users based on a given name
// Used to find new friends to add
const findUsers = (req, res) =>{
    let {name} = req.body;
    if(name.length === 0){
        res.json({msg: "No users found"});
    }

    let listOfNames = [];
    if(req.body.name.includes(" ")){
        // Check if user gave 1 or multiple words
        oneWord =false;
        split = name.split(" ");
        
        // convert to lowercase 
        for(let i=0;i<split.length;i++){
            listOfNames.push(split[i].toLowerCase());
        }
    }
    else{
        listOfNames.push(name.toLowerCase());
    }
    // Find all users and filter name
    User.find({}).then(result => {
        const users = [];
        for(let i=0;i<result.length;i++){
            let userNames = `${result[i].firstName} ${result[i].lastName}`.split(" ");
            
            for(let j=0;j<userNames.length;j++){
                let found = false;
                // Convert names of all users to lowercase when comparing 
                // If matching, add to array of found users
                for(let k=0;k<listOfNames.length;k++){
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
    }).catch(e => console.log(e));
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
    deleteUser
}