const initState = {
    queryResults: [],
    recipients: []
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
        default:
            return state;
    }
}

export default messagesReducer;