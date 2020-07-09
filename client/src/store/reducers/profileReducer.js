const initState={imgURL: null};

const profileReducer = (state = initState, action) => {
    switch(action.type){
        case "USER_INFO":
            return {
                ...state, 
                firstName: action.firstName, 
                lastName: action.lastName
            }

        case "LOAD_PROFILE_PIC":
            return{
                ...state,
                imgURL: action.imgURL
            }

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