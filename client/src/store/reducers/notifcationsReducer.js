const initState = {
    newNotif: false
}

const notificationsReducer = (state = initState, action) =>{
    switch (action.type){
        case('INCOMING_NOTIF'):
            return{
                newNotif: action.newNotif
            }
        case('READ_NOTIF'):
            return{
                newNotif: action.newNotif
            }
        default:
            return state;
    }
}

export default notificationsReducer;