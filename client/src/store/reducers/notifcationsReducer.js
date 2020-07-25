const initState = {
    newNotif: false,
    notifs: []
}

const notificationsReducer = (state = initState, action) =>{
    switch (action.type){
        case('INCOMING_NOTIF'):
            return{
                ...state,
                notifs: [...state.notifs],
                newNotif: action.newNotif
            }
        case('READ_NOTIF'):
            return{
                ...state,
                notifs: [],
                newNotif: action.newNotif
            }
        case('LOAD_NOTIFS'):
            return{
                ...state,
                notifs: [...action.notifs]
            }
        case("DELETE_NOTIF"):
            return{
                ...state,
                notifs: [...action.notifs]
            }
        default:
            return state;
    }
}

export default notificationsReducer;