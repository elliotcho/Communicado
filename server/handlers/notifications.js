const {User} = require('../dbschema');

const loadNotifs = (req, res) =>{
    const {uid} = req.params;
    // Find User by ID
    User.findOne({_id: uid}).then(result =>{
        // Store notifs attached from result 
        const {notifs} = result;
        // Sort notifs by current date and send back as json
        notifs.sort((a, b) => b.date - a.date);
        res.json(notifs);
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
    loadNotifs, 
    checkUnreadNotifs
}