import axios from 'axios';

export const login = (credentials) =>{
    return (dispatch) =>{
        const data = {...credentials};

        axios.post('http://localhost:5000/', data, {headers: {'Content-Type': 'application/json'}})
        .then(response =>{
            const {msg, uid} =response.data;

            if(msg==='Success'){
                dispatch({type: 'LOGIN_SUCCESS', uid});
            }

            else{
                alert(msg);
            }
        });
    }
}

export const signUp = (credentials) => {
    return (dispatch) =>{
           // Create data object with form values
           const data = {...credentials};

           // Basic config for "post" axios method
           const config = {
               headers: {'Content-Type': 'application/json'}
           }
   
           // Use axios to post message to server
           axios.post('http://localhost:5000/signup', data, config).then(response => {
               if (response.data.msg === 'Success') {
                  dispatch({type:'SIGNUP_SUCCESS', uid: response.data.uid});
               } else {
                   alert(response.data.msg)
               }
           });
    }
}