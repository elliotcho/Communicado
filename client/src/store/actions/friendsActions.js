import axios from 'axios';

export const findUsers = (name) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}}

        axios.post('http://localhost:5000/findusers', {name: name.trim()}, config).then(response=>{
            dispatch({type: 'USERS_FOUND', users: response.data.users});
        });
    }
}

