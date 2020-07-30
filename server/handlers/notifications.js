const {User} = require('../dbschema');

const getFriendStatus = (req, res) => {
    const {senderId, receiverId} = req.body;

    User.findOne({_id: receiverId}).then(user =>{
        const {notifs, friends} = user;

        let found =false;

        for(let i=0;i<friends.length;i++){
            if(friends[i] === senderId){
                found = true;
                break;
            }
        } 

        if(found){
            res.json({status: 'Friends'});
        }

        else{
            found =false;

            for(let i=0;i<notifs.length;i++){
                if(notifs[i].senderId === senderId && notifs[i].friendRequest){
                    found = true;
                    break;
                }
            }

            if(found){
                res.json({status: 'Pending'});
            }

            else{
                res.json({status: 'Add Friend'});
            }
        }
    
    });
}

const readNotifs = (req, res) =>{
    const {uid} = req.params;
    // Find User by ID
    User.findOne({_id: uid}).then(result =>{
        // Store notifs attached from result 
        const {notifs} = result;

        for(let i=0;i<notifs.length;i++){
            notifs[i].read = true;
        }

        // Sort notifs by current date and send back as json
        notifs.sort((a, b) => b.date - a.date);
 
        User.updateOne({_id: uid}, {notifs}).then(() =>{
            res.json(notifs);
        });
    }); 
}
// Check if unread notifs when loaded and colour navbar if new notif
const checkUnreadNotifs = (req, res) =>{
    const {uid} = req.params;
    // Find if user has unread notifications 
    User.findOne({_id: uid}).then(result =>{
        const unread = result.notifs.filter(notif =>{ 
            return notif.read === false
        });
        
        res.json({
            unread: unread.length !== 0
        });
    });
}

module.exports= {
    readNotifs, 
    checkUnreadNotifs,
    getFriendStatus
}