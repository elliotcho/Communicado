// Set initial ID to null or check if window has 1 saved
const initState = {
    uid: null || window.localStorage.getItem('uid')
};

// Setup reducer for authentication actions (signup and login)
const authReducer = (state = initState, action) =>{
    if(state.uid){window.localStorage.setItem('uid', state.uid);}
    if(action.uid){window.localStorage.setItem('uid', action.uid);}
    // Switch based on which action was received after request from server
    switch(action.type){
        // Successful login
        case "LOGIN_SUCCESS":
            return {
                ...state,
                uid: action.uid
            }
        // successful Signup
        case "SIGNUP_SUCCESS":
            return{
                ...state,
                uid: action.uid
            }
        default:
            return state;
    }
}

export default authReducer;