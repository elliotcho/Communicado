import React, {Component} from 'react';

const axios=require('axios');

function showPass(){
    let updatePassword = document.getElementById('changePassword');
    if(updatePassword.style.display==='block'){
        updatePassword.style.display='none';
    }
    else{
        updatePassword.style.display='block';
    }
}

class Settings extends Component{
    constructor(){
        super();
    
        this.state={
            name: '',
            password: ''
        }
    }

    render(){
        return(
           <div>
               <h1>Account Settings</h1>
               <label for="name">Name</label>
               <input type="text" id="name" name="fname"></input>
               <input type="button" value="Update" id="Update" onclick="updateName()"></input>
               <br></br>
               <br></br>
               <input type="button" value="Update Password" id="UpdatePassword" onclick="showPass()"></input>
               <br></br>
               <br></br>
               <div id="changePassword">
                    <label for="name">Current Password:</label>
                    <input type="text" id="current" ></input>
                    <br></br>
                    <br></br>
                    <label for="name">New Password:</label>
                    <input type="text" id="new" ></input>
                    <br></br>
                    <br></br>
                    <label for="name">Confirm Password:</label>
                    <input type="text" id="confrim" ></input>
                    <input type="button" value="Complete Update"id="complete" onclick="completePassword()"></input>
               </div>
           </div>
        )
    }
}


export default Settings;