const initState = {uid: null || window.localStorage.getItem('uid')};
// Setup reducer for authentication actions (signup and login)
const authReducer = (state = initState, action) =>{
    if(state.uid){window.localStorage.setItem('uid', state.uid);}
    if(action.uid){window.localStorage.setItem('uid', action.uid);}

    // Login
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {
                ...state,
                uid: action.uid
            }
    // Signup
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