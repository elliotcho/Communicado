const {User} = require('../dbschema');

// Get status of a friend request
const getFriendStatus = async (req, res) => {
    const {senderId, receiverId} = req.body;

    // Find user and destructure needed arrays 
    const user = await User.findOne({_id: receiverId})
    const {notifs, friends} = user;

    let found = false;
    // See if users are already friends
    for (let i=0; i < friends.length; i++) {
        if(friends[i] === senderId){
            found = true;
            break;
        }
    } 
    if (found) {
        res.json({status: 'Friends'});
    }
    else {
        // Check if there is already a pending friendRequest
        found = false;
        for (let i=0; i < notifs.length; i++) {
            if(notifs[i].senderId === senderId && notifs[i].friendRequest){
                found = true;
                break;
            }
        }
        if (found) {
            res.json({status: 'Pending'});
        }
        // If no existing request, can add user
        else {
            res.json({status: 'Add Friend'});
        }
    }
}

// Read notifications of a user
const readNotifs = async (req, res) =>{
    const {uid} = req.params;
    // Find User by ID
    const result = User.findOne({_id: uid})
    const { notifs } = result;

    // Mark notifs as read once user loads
    for(let i=0; i < notifs.length; i++) {
        notifs[i].read = true;
    }
    // Sort notifs by current date and send back as json
    notifs.sort((a, b) => b.date - a.date);
    await User.updateOne({_id: uid}, {notifs})
    res.json(notifs); 
}

// Check if unread notifs when loaded and colour navbar if new notif
const checkUnreadNotifs = async (req, res) =>{
    const {uid} = req.params;
    // Find if user has unread notifications 
    const result = await User.findOne({_id: uid})
    // For all notifs, check if there are any unread
    const unread = result.notifs.filter(notif => { 
        return notif.read === false
    });
    res.json({ unread: unread.length !== 0 });
}

module.exports= {
    readNotifs, 
    checkUnreadNotifs,
    getFriendStatus
}