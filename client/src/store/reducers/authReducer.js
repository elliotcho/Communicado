import * as types from '../constants/actionTypes';

// Set initial ID to null or check if window has 1 saved
const initState = {
    uid: null || window.localStorage.getItem('uid')
};

// Setup reducer for authentication actions (signup and login)
const authReducer = (state = initState, action) =>{
    // Switch based on which action was received after request from server
    switch(action.type){
        // Successful login
        case types.SIGNIN_SUCCESS:
            window.localStorage.setItem('uid', action.uid);

            return {
                ...state,
                uid: action.uid
            }
        default:
            return state;
    }
}

export default authReducer;