const initState = {
    users: [], 
    friends: [],
    active: [],
    inactive: [],
    numFriends: 0
};

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
        case 'CLEAR_USERS':
            return{
                ...state,
                users: []
            }
        case "LOAD_ONLINE_FRIENDS":
            return{
                ...state,
                active: [...action.active],
                inactive: [...action.inactive]
            }
        case "FRIENDS_FOUND":
            return{
                ...state,
                friends: [...action.friends]
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
        case 'COUNT_FRIENDS':
            return{
                ...state,
                numFriends: action.numFriends
            }
        default:
            return state;
    }
}

export default friendsReducer;