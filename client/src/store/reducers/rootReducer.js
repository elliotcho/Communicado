import authReducer from './authReducer';
import profileReducer from './profileReducer';
import friendsReducer from './friendsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    friends: friendsReducer
});

export default rootReducer;