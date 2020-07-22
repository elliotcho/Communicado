export const colorNavbar = () =>{
    return (dispatch) =>{
        dispatch({type: 'INCOMING_NOTIF', newNotif: true});
    }   
}

export const uncolorNavbar = () =>{
    return (dispatch) =>{
        dispatch({type: 'READ_NOTIF', newNotif: false});
    }
}