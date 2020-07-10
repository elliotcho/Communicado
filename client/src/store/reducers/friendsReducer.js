const initState = {};

const friendsReducer = (state=initState, action) =>{
    switch(action.type){
        case "USERS_FOUND":
            return{
                ...state,
                users: action.users
            }

        default:
            return state;
    }
}

export default friendsReducer;