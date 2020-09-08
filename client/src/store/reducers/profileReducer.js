import * as types from '../constants/actionTypes';

const initState={
    firstName: '',
    lastName: '',
    dateCreated: ''
};

// Reducer for all profile actions
const profileReducer = (state = initState, action) => {
    switch(action.type){
        // Get user info
        case types.GET_ACCOUNT_DATA:
            return {
                ...state, 
                firstName: action.firstName, 
                lastName: action.lastName,
                dateCreated: action.dateCreated
            }
        // Change user name based on given names
        case types.CHANGE_ACCOUNT_NAME:
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