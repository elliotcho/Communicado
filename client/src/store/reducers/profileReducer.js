const initState={imgURL: null};
// Reducer for all profile actions
const profileReducer = (state = initState, action) => {
    switch(action.type){
        // Get user info
        case "USER_INFO":
            return {
                ...state, 
                firstName: action.firstName, 
                lastName: action.lastName
            }
        // Load user profile picture
        case "LOAD_PROFILE_PIC":
            return{
                ...state,
                imgURL: action.imgURL
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