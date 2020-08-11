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