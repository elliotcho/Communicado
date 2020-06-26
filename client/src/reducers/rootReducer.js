const initState={
    _id: '',
    firstName: '',
    lastName: '',
    email: '', 
    password: ''
};

const rootReducer = (state =initState, action) =>{
    if(action.type === 'SAVE'){
        return {
            ...action.userInfo
        }
    }

    else if(action.type ==='CHANGE'){
        return{
            ...state,
            firstName: action.fName,
            lastName: action.lName
        }
    }

    return state;
};

export const saveUserInfo = (userInfo) =>{
     return {
         type: 'SAVE',
         userInfo
     }
};

export const changeUserName = (fName, lName) =>{
    return{
        type: 'CHANGE',
        fName,
        lName
    }
}

export const clearUserInfo = () => {
    return {};
}

export default rootReducer;