// Color navbar if unread notification exists
import axios from 'axios';

export const colorNavbar = () =>{
    return (dispatch) =>{
        dispatch({type: 'INCOMING_NOTIF', newNotif: true});
    }   
}
// Uncolor navbar if read notification 
export const uncolorNavbar = () =>{
    return (dispatch) =>{
        dispatch({type: 'READ_NOTIF', newNotif: false});
    }
}

export const getNotifications = (uid) =>{ 
    return (dispatch) =>{
        axios.get(`http://localhost:5000/notifs/${uid}`).then(response=>{
            dispatch({type: 'LOAD_NOTIFS', notifs: response.data});
        });
    }
}