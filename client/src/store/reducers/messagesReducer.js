const initState = {
    queryResults: [],
    recipients: [],
    chats: [],
    msgsOnDisplay: [],
    typingOnDisplay: [],
    chatIdOnDisplay: null
};

// Reducer for friend actions
const messagesReducer = (state=initState, action) =>{
    switch(action.type){
        case 'GET_QUERY_RESULTS':
            return{
                ...state,
                queryResults: [...action.queryResults]
            }
        case 'UPDATE_RECIPIENTS':
            return{
                ...state,
                recipients: [...action.recipients]
            }
        case 'CLEAR_COMPOSER':
            return{
                ...state,
                queryResults: [],
                recipients: []
            }
        case 'LOAD_CHATS':
            return{
                ...state,
                chats: [...action.chats]
            }
        case 'SET_MESSAGES_ON_DISPLAY':
            return{
                ...state,
                msgsOnDisplay: [...action.messages]
            }
        case 'SET_CHAT_ID_ON_DISPLAY':
            return{
                ...state,
                chatIdOnDisplay: action.chatId
            }
        case 'NEW_MESSAGE':
            return{
                ...state,
                msgsOnDisplay: [...state.msgsOnDisplay, action.newMessage]
            }
        
        case 'IS_TYPING':
            return{
                ...state,
                typingOnDisplay : [...state.typingOnDisplay, action.typingId]
            }
        default:
            return state;
    }
}

export default messagesReducer;