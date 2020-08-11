export const getRecipients = (queryResults) =>{
    return (dispatch) =>{
        dispatch({type: 'GET_RECIPIENTS', queryResults});
    }
}