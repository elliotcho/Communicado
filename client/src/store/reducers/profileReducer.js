import * as types from '../constants/actionTypes';

const initState={
    firstName: '',
    lastName: '',
    dateCreated: '',
    imgURL: null
};

// Reducer for all profile actions
const profileReducer = (state = initState, action) => {
    switch(action.type){
        // Get user info
        case types.GET_USER_INFO:
            return {
                ...state, 
                firstName: action.firstName, 
                lastName: action.lastName,
                dateCreated: action.dateCreated
            }
        // Change user name based on given names
        case "CHANGE_NAME":
            return {
                ...state, 
                firstName: action.firstName, 
                lastName: action.lastName
            }
            
        default: 
            return state;
    }
}

export default profileReducer;