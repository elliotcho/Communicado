// Color navbar if unread notification exists
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