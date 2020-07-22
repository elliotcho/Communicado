import authReducer from './authReducer';
import profileReducer from './profileReducer';
import friendsReducer from './friendsReducer';
import notificationsReducer from './notifcationsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    friends: friendsReducer,
    notifs: notificationsReducer
});

export default rootReducer;