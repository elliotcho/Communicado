import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};

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

export const setMsgsOnDisplay = (chatId) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/chats/messages/${chatId}`);
        const messages = response.data;

        dispatch({
            type: 'SET_MESSAGES_ON_DISPLAY', 
            messages
        });
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

        const {chatIdOnDisplay, typingOnDisplay} = state.messages;
        
        if(chatIdOnDisplay === chatId && !typingOnDisplay.includes(uid)){
            dispatch({type: 'IS_TYPING', typingId: uid});
        }
    }
};

export const handleStopTyping = (uid, chatId) =>{
    return async (dispatch, getState) => {
        const state = getState();

        const {chatIdOnDisplay} = state.messages;
        
        if(chatIdOnDisplay === chatId){
            dispatch({type: 'STOP_TYPING', typingId: uid});
        }
    }
}

export const getUnseenChats = (uid) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:5000/chats/unseen/${uid}`);
        const {unseen} = response.data;

        dispatch({type: 'UNSEEN_CHATS', unseen});
    }
}

export const seeChats = (uid) => {
    return async (dispatch) => {
        await axios.put(`http://localhost:5000/chats/seechats/${uid}`);
        dispatch({type: 'SEE_CHATS'});
    }
}

export const readChat = (chatId, uid, lastMsg, isActive) => {
    return async (dispatch, getState) => {
        if(isActive){
            await axios.post(`http://localhost:5000/chats/readchat`, {chatId, uid}, config);

            const state = getState();
            const {chats} = state.messages;
    
            for(let i = 0; i < chats.length; i++){
                if(chats[i]._id === chatId){
                    const {messages} = chats[i];
                    const n = messages.length;
    
                    messages[n - 1].readBy.push(uid);
                    
                    break;
                }
            }
    
            dispatch({
                type: 'LOAD_CHATS',
                chats
            });
        }

        return lastMsg.readBy.includes(uid);
    }
}

export const getChatPics = async (chatId, uid, loadProfilePic) => {
        const members = await getMemberIds(chatId, uid);

        const size = Math.min(members.length, 2);
        const chatPics = [];

        for(let i=0;i<size;i++){
            const id = members[i];

            const imgURL = await loadProfilePic(id);

            chatPics.push(imgURL);
        }

        return chatPics;
}

export const getMemberNames = async (chatId, uid) => {
    const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
    const memberNames = response.data.memberNames;
    return memberNames;
}

export const getMemberIds = async (chatId, uid) => {
    const response = await axios.post('http://localhost:5000/chats/memberids', {uid, chatId});
    const memberIds = response.data.members;
    return memberIds;
}