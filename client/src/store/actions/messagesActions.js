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
    return async (dispatch, getState) =>{
        const response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        dispatch({type: 'LOAD_CHATS', chats});
    }
}

export const setMsgsOnDisplay = (messages) =>{
    return (dispatch) =>{
        dispatch({type: 'SET_MESSAGES_ON_DISPLAY', messages});
    }
}

export const setChatIdOnDisplay = (chatId) => {
    return (dispatch) =>{
        dispatch({type: 'SET_CHAT_ID_ON_DISPLAY', chatId});
    }
}

export const handleNewMessage = (newMessage, chatId) =>{
    return (dispatch, getState) => {
        const state = getState();

        const {chatIdOnDisplay} = state.messages;

        if(chatIdOnDisplay === chatId){
            dispatch({type: 'NEW_MESSAGE', newMessage});
        }
    }
}

export const handleIsTyping = (uid, chatId) =>{
    return async (dispatch, getState) => {
        const state = getState();

        const {chatIdOnDisplay} = state.messages;
        
        if(chatIdOnDisplay === chatId){
            dispatch({type: 'IS_TYPING', typingId: uid});
        }
    }
}