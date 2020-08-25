const {User} = require('../models/user');

exports.getRecipients = async (data) =>{
    const {uid,recipients, name} = data;
    const recipientIDs={}
    
    if(name.trim() === ''){
        return [];
    }

    for(let i=0;i<recipients.length;i++){
        recipientIDs[recipients[i]._id]=true
    }

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    let j = 0;

    const result = [];

    for(let i=0;i<friends.length && j<4;i++){
        const friend = await User.findOne({_id: friends[i]._id});

        let firstName = friend.firstName.split(" ").join("").toLowerCase();
        let lastName = friend.lastName.split(" ").join("").toLowerCase();
        
        let query = name.split(" ").join("").toLowerCase();

        if((firstName + lastName).startsWith(query) && !recipientIDs[friend._id]){
            result.push(friend);
            j++;
        }
    }

    return result;
}
