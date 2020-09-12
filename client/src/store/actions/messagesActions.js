import * as types from '../constants/actionTypes';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};

export const getRecipients = (queryResults) =>{
    return (dispatch) =>{
        dispatch({
            type: types.LOAD_COMPOSER_RESULTS, 
            queryResults
        });
    }
}

export const updateRecipients = (recipients) =>{
    return (dispatch) =>{
        dispatch({
            type: types.UPDATE_RECIPIENTS, 
            recipients
        });
    }
}

export const renderComposerChat = (chatId) => {
    return (dispatch) => {
        dispatch({
            type: types.RENDER_COMPOSER_CHAT,
            chatId
        });
    }
}

export const clearComposerChat = () => {
    return (dispatch) => {
        dispatch({type: types.CLEAR_COMPOSER_CHAT});
    }
}

export const clearComposer = () =>{
    return (dispatch) =>{
        dispatch({type: types.CLEAR_COMPOSER});
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
                type: types.LOAD_CHATS,
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
            chatPics.push(await loadProfilePic(members[i]));
        }

        return chatPics;
}

export const getMemberNames = async (chatId, uid) => {
    const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
    const memberNames = response.data.memberNames;
    return memberNames;
}

export const loadChats = (uid, cancelSource = null) =>{
    return async (dispatch) =>{
        const route = `http://localhost:5000/chats/user/${uid}`;

        const response = (cancelSource)? 
            await axios.get(route, {cancelToken: cancelSource.token}):
            await axios.get(route);
        
        const chats = response.data;

        dispatch({
            type: types.LOAD_CHATS, 
            chats
        });
    
        return chats;
    }
}

export const seeChats = (uid) => {
    return async (dispatch) => {
        await axios.put(`http://localhost:5000/chats/seechats/${uid}`);
        dispatch({type: types.SEE_CHATS});
    }
}

export const clearChats = () =>{
    return (dispatch) => {
        dispatch({type: types.CLEAR_CHATS});
    }
}


export const getUnseenChats = (uid) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:5000/chats/unseen/${uid}`);
        const {unseen} = response.data;

        dispatch({
            type: types.LOAD_UNSEEN_CHATS, 
            unseen
        });
    }
}

export const createChat = async (uid, recipients, content) => {
    const response = await axios.post('http://localhost:5000/chats/create', {uid, recipients, content}, config);
    const {chatId} = response.data; 
    return chatId;
}

export const sendMessage = async (chatId, uid, content) =>{
    const response = await axios.post('http://localhost:5000/chats/message',{chatId, uid, content}, config);
    const newMessage = response.data;
    return newMessage;
}

export const getMemberIds = async (chatId, uid) => {
    const response = await axios.post('http://localhost:5000/chats/memberids', {uid, chatId});
    const memberIds = response.data.members;
    return memberIds;
}

export const handleIsTyping = (uid, chatId) =>{
    return async (dispatch, getState) => {
        const state = getState();

        const {chatIdOnDisplay, typingOnDisplay} = state.messages;
        
        if(chatIdOnDisplay === chatId && !typingOnDisplay.includes(uid)){
            dispatch({
                type: types.IS_TYPING, 
                typingId: uid
            });
        }
    }
};

export const handleStopTyping = (uid, chatId) =>{
    return async (dispatch, getState) => {
        const state = getState();

        const {chatIdOnDisplay, typingOnDisplay} = state.messages;
        
        if(chatIdOnDisplay === chatId){
            for(let i=0;i<typingOnDisplay.length;i++){
                if(typingOnDisplay[i] === uid){
                    typingOnDisplay.splice(i,1);
                }
            }

            dispatch({
                type: types.STOP_TYPING, 
                typingOnDisplay
            });
        }
    }
}

export const setChatIdOnDisplay = (chatId) => {
    return (dispatch) =>{
        dispatch({
            type: types.SET_CHAT_ID, 
            chatId
        });
    }
}

export const setMsgsOnDisplay = (chatId, uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/chats/messages/${chatId}`);
        const messages = response.data;

        for(let i=0;i<messages.length;i++){
            if(messages[i].readBy.includes(uid)){
                continue;
            }

            messages[i].readBy.push(uid);
        }

        dispatch({
            type: types.LOAD_MESSAGES, 
            messages
        });
    }
}

export const renderNewMessage = (newMessage, chatId, uid) =>{
    return (dispatch, getState) => {
        const state = getState();

        const {chatIdOnDisplay} = state.messages;

        if(chatIdOnDisplay === chatId){
            if(!newMessage.readBy.includes(uid)){
                newMessage.readBy.push(uid);
            }

            dispatch({
                type: types.NEW_MESSAGE, 
                newMessage
            });
        }
    }
}

export const getReadReceipts = async (readBy, uid, getProfilePic) => {
    const readReceipts = [];

    for(let i=0;i<readBy.length;i++){
        if(readBy[i] === uid){
            continue;
        }

        const imgURL = await getProfilePic(readBy[i]);

        readReceipts.push(imgURL);
    }

    return readReceipts;
}

export const handleReadReceipts = (chatId, readerId) => {
    return (dispatch, getState) => {
        const state = getState();

        const {chatIdOnDisplay, msgsOnDisplay} = state.messages;
        const messages = msgsOnDisplay;

        if(chatIdOnDisplay === chatId){
            for(let i =0;i<messages.length;i++){
                if(messages[i].readBy.includes(readerId)){
                    continue;
                }

                messages[i].readBy.push(readerId);
            }

            dispatch({
                type: types.LOAD_MESSAGES,
                messages
            });
        }
    }
}

export const  searchMessageCards = async (uid, text)=>{
    //alert("hjghg");
    const arr = [];
    const response = await axios.get(`http://localhost:5000/chats/user/${uid}`); 
    const chatList = response.data;
    //alert(chatList[0]);
    for( let i=0;i<chatList.length;i++){
        //alert("hjgjhgjhg");
        let chatId = chatList[i]._id;
        for( let j=0; j<chatList[i].members.length;j++){
            let memberId = chatList[i].members[j];
            //alert(memberId);
            if(memberId===uid) continue;
            let response = await axios.post(`http://localhost:5000/chats/members`, {memberId, chatId}, config);
            let memberName = response.data.memberNames;
            //alert(memberName);
            if(memberName===text){
                arr.push(memberName);
            }
        }
    }
    return arr;

export const checkIfChatExists = async (uid, memberId) => {
    const data = {uid, memberId};

    const response = await axios.post('http://localhost:5000/chats/exists', data, config);
    const {chatId} = response.data;

    return chatId;
}