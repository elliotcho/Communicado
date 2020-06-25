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
                res.json({...result, msg:'Success'});
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
                newUser.save().then(() => {
                    res.json({...newUser, msg: "Account created!"})
                });
            }
        });
    }
}

const handleProfilePic = (upload, fs, path) => (req, res) =>{
   if(req.body.action === 'load'){
       User.findOne({_id: req.body.id}).then(result =>{
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

            User.findOne({_id: req.body.id}).then(result =>{
                if(typeof result.profliePic ==='undefined'){
                    fs.unlink(path.join(__dirname, `images/${result.profilePic}`), err =>{
                        if(err){
                            console.log(err);
                        }
                    });
                }

                User.updateOne({_id: req.body.id}, {profilePic: req.file.filename}).then(()=>{
                    res.json({msg: 'Success'});
                });
            });
        });
    }
}

const changeName = (req, res) => {
    if(req.body.firstName ==='' && req.body.lastName !== ''){
       
    }

    else if(req.body.firstName !== '' && req.body.lastName ===''){

    }

    else if(req.body.firstName !== '' && req.body.lastName !== ''){
        
    }

    else{
        res.json({msg: 'Both inputs are blank: your name has not been changed.'});
    }
}

// exports
module.exports = {
    login,
    signup,
    handleProfilePic,
    changeName
}