import axios from 'axios';

export const getRecipients = (queryResults) =>{
    return (dispatch) =>{
        dispatch({type: 'GET_QUERY_RESULTS', queryResults});
    }
}

export const updateRecipients = (recipients) =>{
    return (dispatch) =>{
        dispatch({type: 'UPDATE_RECIPIENTS', recipients});
    }
}

export const clearComposer = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_COMPOSER'});
    }
}

export const loadChats = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        dispatch({type: 'LOAD_CHATS', chats});
    }
}