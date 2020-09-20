// Authentication actions for a user
import * as types from '../constants/actionTypes';
import axios from 'axios';

const config = {headers: {'Content-Type': 'application/json'}};

// User login given a set of credentials
export const login = (credentials) => {
    return async (dispatch) =>{
        const data = {...credentials};

        // Send login as json and check if login is successful
        const response = await axios.post('http://localhost:5000/users/login', data, config)
        const {msg, uid} = response.data; 

        if(msg==='Success'){
            dispatch({
                type: types.SIGNIN_SUCCESS, 
                uid
            });
        }
        
        else {
            alert(msg);
        }
    }
}

// User signup function with given credentals
export const signUp = (credentials) => {
    return async (dispatch) =>{
        if(credentials.firstName.includes(",") || credentials.lastName.includes(",")){
            alert("Invalid name: First name and last name cannot have a comma character!");
            return;
        }

        // Create data object with form values
        const data = {...credentials};

        // Use axios to post message to server
        const response = await axios.post('http://localhost:5000/users/signup', data, config);
        const {msg, uid} = response.data;

        if (msg === 'Success') {
            dispatch({
                type: types.SIGNIN_SUCCESS, 
                uid
            });
        } 
        
        else {
            alert(msg)
        }
    }
}