const {User} = require('../models/user');
const {Notification} = require('../models/notif');

exports.getUserFriends = async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const {friends} = user;

    const userFriends = await User.find({_id: {$in: friends}});
    userFriends.sort((a, b) => 
        a.firstName === b.firstName?
        a.lastName - b.lastName:
        a.firstName - b.firstName
    );

    res.json(userFriends);
}

exports.getFriendStatus = async (req, res) => {
    const {senderId, receiverId} = req.body;

    const receiver = await User.findOne({_id: receiverId});
    const {notifs, friends} = receiver;

    let found = false;

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
        found = false;

        for(let i=0;i<notifs.length;i++){
            if(notifs[i].senderId === senderId && notifs[i].friendRequest){
                found = true;
                break;
            }
        }

        const status = found? 'Pending' : 'Add Friend';
    
        res.json({status});
    }
}