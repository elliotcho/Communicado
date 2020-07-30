// Color navbar if unread notification exists
import axios from 'axios';

export const colorNavbar = () =>{
    return (dispatch) =>{
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

export const removeNotification = (notifId, list) =>{
    return (dispatch) => {
        for(let i=0;i<list.length;i++){
            if(list[i]._id === notifId){
                list.splice(i, 1);
                break;
            }
        }

        dispatch({type:"DELETE_NOTIF", notifs: list});
    }
}