const {Notification} = require('../dbschema');

const loadNotifs = (req, res) =>{
    const {uid} = req.params;

    Notification.find({receiverId: uid}).then(result =>{
        result.sort((a, b) => b.date - a.date);
        res.json(result);
    });
}

module.exports= {
    loadNotifs
}