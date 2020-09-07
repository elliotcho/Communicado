// Actions regarding friends such as find all users or find all friends
import axios from 'axios';

const config = {headers: {'Content-Type': 'application/json'}};

export const getFriendStatus  = async (receiverId, senderId) => {
    const data = {receiverId, senderId};
    const response = await axios.post('http://localhost:5000/friends/status', data, config);
    return response.data.status;
}

// Finds all users in the database that match a given name
export const findUsers = (name, uid) => {
    return async (dispatch) => {
       
        const response = await axios.post('http://localhost:5000/users/search', {name: name.trim(), uid, findFriends: false}, config);

        dispatch({type: 'USERS_FOUND', users: response.data.users});
    }
}

//clear friends when unmounting page
export const clearUsers = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_USERS'});
    }
}


export const findFriends = (name, uid) =>{
    return async (dispatch) =>{
        const config = {headers: {'Content-Type': 'application/json'}}

        const response = await axios.post('http://localhost:5000/users/search', {name: name.trim(), uid, findFriends: true}, config);

        dispatch({type: 'FRIENDS_FOUND', friends: response.data.users});
    }
}


export const loadFriends = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/friends/${uid}`);
        
        dispatch({type: 'LOAD_FRIENDS', friends: response.data});
    }
}

export const countFriends = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/friends/${uid}`)
        const friends = response.data;
        dispatch({type: 'COUNT_FRIENDS', numFriends: friends.length});
    }
}

export const removeFriend = (friendId, friends) =>{
    return (dispatch) => {
        for(let i=0;i<friends.length;i++){
            if(friends[i]._id === friendId){
                friends.splice(i, 1);
                break;
            }
        }

        dispatch({type: 'REMOVE_FRIEND', friends});
    }
}

export const updateOnlineFriends = (friends) =>{
    return (dispatch) =>{
        dispatch({
            type: 'LOAD_ONLINE_FRIENDS',
            active: friends[0],
            inactive: friends[1]
        });
    }
}