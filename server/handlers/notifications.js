const {Notification} = require('../dbschema');

const loadNotifs = (req, res) =>{
    const {uid} = req.params;

    Notification.find({receiverId: uid}).then(result =>{
        result.sort((a, b) => b.date - a.date);
        res.json(result);
    });
}

const checkUnreadNotifs = (req, res) =>{
    const {uid} = req.params;

    Notification.find({receiverId: uid}).then(result =>{
        const unread = result.filter(notif => !notif.read);
        
        res.json({
            unread: unread.length !== 0
        });
    });
}

module.exports= {
    loadNotifs, 
    checkUnreadNotifs
}