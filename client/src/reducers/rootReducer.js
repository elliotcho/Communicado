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

    return state;
};

export const saveUserInfo = (userInfo) =>{
     return {
         type: 'SAVE',
         userInfo
     }
};

export const clearUserInfo = () => {
    return {};
}

export default rootReducer;