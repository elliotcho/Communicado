const initState = {
    queryResults: []
};

// Reducer for friend actions
const messagesReducer = (state=initState, action) =>{
    switch(action.type){
        case 'GET_RECIPIENTS':
            return{
                ...state,
                queryResults: action.queryResults
            }
        default:
            return state;
    }
}

export default messagesReducer;