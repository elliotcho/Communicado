const initState = {users: [], friends: []};

// Reducer for friend actions
const friendsReducer = (state=initState, action) =>{
    switch(action.type){
        // Find all users
        case "USERS_FOUND":
            return{
                ...state,
                // Update users for all found users
                users: [...action.users]
            }
        case 'REMOVE_FRIEND':
            return{
                ...state,
                friends: [...action.friends]
            }
        case 'LOAD_FRIENDS':
            return{
                ...state,
                friends: [...action.friends]
            }
        default:
            return state;
    }
}

export default friendsReducer;