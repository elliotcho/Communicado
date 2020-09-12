import * as types from '../constants/actionTypes';

const initState = {
    newNotif: false,
    notifs: []
}

const notificationsReducer = (state = initState, action) =>{
    switch (action.type){
        case types.INCOMING_NOTIF:
            return{
                ...state,
                notifs: [...state.notifs],
                newNotif: action.newNotif
            }
        case types.READ_NOTIFS:
            return{
                ...state,
                notifs: [...action.notifs],
                newNotif: false
            }
        default:
            return state;
    }
}

export default notificationsReducer;