import * as types from '../constants/actionTypes';
import axios from 'axios';

const config = {headers: {'Content-Type': 'multipart/form-data'}};

// Get user profile info
export const getUserInfo = (uid) =>{
    return async (dispatch) => {
        // Send post request to userInfo branch in server handlers
        const response = await axios.get(`http://localhost:5000/users/${uid}`);
        
        const {
            dateCreated,
            firstName, 
            lastName 
        } = response.data;

        dispatch({
            type: types.GET_USER_INFO,
            dateCreated,
            firstName,
            lastName
        });
    }
}

export const getUserData = async (uid) => {
    const response = await axios.get(`http://localhost:5000/users/${uid}`);
    return response.data;
}

// Load a users profile picture 
export const loadProfilePic = async (uid) =>{
    const response = await fetch(`http://localhost:5000/users/profilepic/${uid}`, {
        method: 'GET'
    }); 
        
    let file = await response.blob();

    return URL.createObjectURL(file);
}

// Changes a users profile picture based on the given image
export const changeProfilePic = (uid, imgFile) => {
    return async () => {
        const formData = new FormData();

        formData.append('uid',  uid);
        formData.append('image', imgFile);
    
        // Post new image and reload browser
        await axios.post('http://localhost:5000/users/profilepic', formData, config);
        
        window.location.reload();
    }
}

// Change users name based on a given first name, last name or both
export const changeUserName = (uid, firstName, lastName) =>{
    return async (dispatch) => {
        const data = {uid, firstName, lastName}
        // Send all names, even if undefined, and handle in server routes
        const response = await axios.post('http://localhost:5000/users/changename', data , {headers: {'content-type': 'application/json'}})
        const {_doc, msg} =response.data;
        if(_doc){
            dispatch({type: 'CHANGE_NAME', firstName: _doc.firstName, lastName: _doc.lastName})
        }
        alert(msg);
    }
}

// Change passwords by providing old password and new password twice
export const changePwd = (uid, currPwd, newPwd, confirmPwd) => {
    return async () => {
        const data = {uid, currPwd, newPwd, confirmPwd}
        // Send post to server route to handle passwords and check if conditions met
        const response = await axios.post('http://localhost:5000/users/changepwd', data, {headers:{'content-type': 'application/json'}});
        const {msg} = response.data;
        alert(msg);
    }
}

// Delete a User
export const deleteUser = (uid) =>{
    return async () =>{ 
        // Delete user from DB
        const response = await axios.delete(`http://localhost:5000/users/${uid}`);
        
        const {msg} =response.data;
        alert(msg);
        
        window.localStorage.clear();
        window.location.href='/';
    }
}