const {User} = require('../dbschema');

const getRecipients = async (data) =>{
    const {uid, name} = data;

    if(name.trim() === ''){
        return [];
    }

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    let j =0;

    const result = [];

    for(let i=0;i<friends.length && j<4;i++){
        const friend = await User.findOne({_id: friends[i]._id});

        let firstName = friend.firstName.split(" ").join("").toLowerCase();
        let lastName = friend.lastName.split(" ").join("").toLowerCase();
        
        let query = name.split(" ").join("").toLowerCase();

        if((firstName + lastName).startsWith(query)){
            result.push(friend);
            j++;
        }
    }

    return result;
}

module.exports = {
    getRecipients
}