const initState = {users: []};

// Reducer for friend actions
const friendsReducer = (state=initState, action) =>{
    switch(action.type){
        // Find all users
        case "USERS_FOUND":
            return{
                ...state,

                //using ... operator recreate new array
                users: [...action.users]
            }
        default:
            return state;
    }
}

export default friendsReducer;