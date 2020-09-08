// Color navbar if unread notification exists
import * as types from '../constants/actionTypes';
import axios from 'axios';

export const checkIfNotifsUnread = async (uid) => {
    const response = await axios.get(`http://localhost:5000/notifs/unread/${uid}`);
    const {unread} = response.data;
    return unread;
}

// Colour the navbar
export const colorNotif = () =>{
    return (dispatch) => {
        dispatch({
            type: types.INCOMING_NOTIF, 
            newNotif: true
        });
    }   
}

export const uncolorNotif = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.put(`http://localhost:5000/notifs/read/${uid}`);
        const notifs = response.data;

        dispatch({
            type: types.READ_NOTIFS, 
            notifs
        });
    }
}

// Remove a notification from the list of notifs for a user
export const removeNotification = (notifId, list) => {
    return (dispatch) => {
        for(let i = 0 ; i < list.length ; i++) {
            if(list[i]._id === notifId) {
                list.splice(i, 1);
                break;
            }
        }
        
        dispatch({
            type: types.READ_NOTIFS, 
            notifs: list
        });
    }
}