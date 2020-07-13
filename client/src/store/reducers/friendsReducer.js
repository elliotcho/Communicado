const initState = {};
// Reducer for friend actions
const friendsReducer = (state=initState, action) =>{
    switch(action.type){
        // Find all users
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