const {User} = require('../models/user');

exports.getOnlineFriends = async (data, active) =>{
    const {uid} = data;

    const activeFriends = [];

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    for(let i=0;i<friends.length;i++){
        if(active[friends[i]._id]){
            activeFriends.push(friends[i]);
        }
    }

    return activeFriends;
}
