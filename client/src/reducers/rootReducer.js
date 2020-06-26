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

    else if(action.type ==='CHANGE_NAME'){
        return{
            ...state,
            firstName: action.fName,
            lastName: action.lName
        }
    }

    else if(action.type==='CHANGE_PWD'){
        return{
            ...state,
            password: action.pwd
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
        type: 'CHANGE_NAME',
        fName,
        lName
    }
}

export const changePwd = (pwd) =>{
    return{
        type: 'CHANGE_PWD',
        pwd
    }
}

export const clearUserInfo = () => {
    return {};
}

export default rootReducer;