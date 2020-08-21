const initState = {
    queryResults: [],
    recipients: [],
    chats: []
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
        default:
            return state;
    }
}

export default messagesReducer;