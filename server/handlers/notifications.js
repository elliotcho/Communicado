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

const loadNotifs = (req, res) =>{
    const {uid} = req.params;

    User.findOne({_id: uid}).then(result =>{
        const {notifs} = result;

        notifs.sort((a, b) => b.date - a.date);
        
        res.json(notifs);
    });
}

const checkUnreadNotifs = (req, res) =>{
    const {uid} = req.params;

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
    loadNotifs, 
    checkUnreadNotifs,
    getFriendStatus
}