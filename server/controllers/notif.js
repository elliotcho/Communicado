const {User} = require('../models/user');

exports.readNotifs = async (req, res) =>{
    const {uid} = req.params;

    // Find User by ID
    const user = await User.findOne({_id: uid});
    const {notifs} = user;

    for(let i=0;i<notifs.length;i++){
        notifs[i].read = true;
    }

    // Sort notifs by current date and send back as json
    notifs.sort((a, b) => b.date - a.date);

    await User.updateOne({_id: uid}, {notifs});

    res.json(notifs); 
}

// Check if unread notifs when loaded and colour navbar if new notif
exports.checkUnreadNotifs = async (req, res) =>{
    const {uid} = req.params;
    
    // Find if user has unread notifications 
    const user = await User.findOne({_id: uid});
    const {notifs} = user;

    const unread = notifs.filter(notif => 
        !notif.read
    );
    
    res.json({unread: unread.length !== 0});
}