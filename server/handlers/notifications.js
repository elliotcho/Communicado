const {User} = require('../dbschema');

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
    checkUnreadNotifs
}