// Actions regarding friends such as find all users or find all friends
import axios from 'axios';

// Finds all users in the database that match a given name
export const findUsers = (name) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}}

        axios.post('http://localhost:5000/findusers', {name: name.trim()}, config).then(response=>{
            dispatch({type: 'USERS_FOUND', users: response.data.users});
        });
    }
}

export const loadFriends = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/friends/${uid}`).then(response =>{
            dispatch({type: 'LOAD_FRIENDS', friends: response.data});
        });
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
