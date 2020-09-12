import * as types from '../constants/actionTypes';

const initState = {
    users: [], 
    friends: [],
    active: [],
    numFriends: 0
};

// Reducer for friend actions
const friendsReducer = (state=initState, action) =>{
    switch(action.type){
        // Find all users
        case types.USERS_FOUND:
            return{
                ...state,
                // Update users for all found users
                users: [...action.users]
            }
        case types.CLEAR_USER_SEARCH:
            return{
                ...state,
                users: []
            }
        case types.UPDATE_FRIENDS:
            return{
                ...state,
                friends: [...action.friends]
            }
        case types.COUNT_FRIENDS:
            return{
                ...state,
                numFriends: action.numFriends
            }
        case types.LOAD_ONLINE_FRIENDS:
            return{
                ...state,
                active: [...action.active]
            }
        default:
            return state;
    }
}

export default friendsReducer;