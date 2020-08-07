// Color navbar if unread notification exists
import axios from 'axios';

// Colour the navbar
export const colorNavbar = () =>{
    return (dispatch) => {
        dispatch({type: 'INCOMING_NOTIF', newNotif: true});
    }   
}

// Uncolor navbar if read notification 
export const uncolorNavbar = (uid) =>{
    return (dispatch) =>{
        axios.put(`http://localhost:5000/notifs/${uid}`).then(response =>{
            dispatch({type: 'READ_NOTIFS', notifs: response.data});
        });
    }
}
// export const uncolorNavbar = async (uid) =>{
//     return (dispatch) =>{
//         const response = await axios.put(`http://localhost:5000/notifs/${uid}`)
//         dispatch({type: 'READ_NOTIFS', notifs: response.data});
//     }
// }

// Remove a notification from the list of notifs for a user
export const removeNotification = (notifId, list) => {
    return (dispatch) => {
        for(let i = 0 ; i < list.length ; i++) {
            if(list[i]._id === notifId) {
                list.splice(i, 1);
                break;
            }
        }
        dispatch({type:"DELETE_NOTIF", notifs: list});
    }
}