import React, {Component} from 'react';
import './Settings.css';
import Navbar from '../../Partials/Navbar';

const axios=require('axios');

class Settings extends Component{
    constructor(){
        super();
    
        this.state={
            firstName: '',
            lastName: '',
            currentPwd: '',
            newPwd: '',
            confirmPwd: '',
            hidePwd: true, 
        }

        this.handleChange=this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
    }

    showForm(){
        let {hidePwd} = this.state;

        this.setState({
            hidePwd: !hidePwd
        });
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    changeName(e){
        e.preventDefault();

        const data={
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }


    }

    render(){
        const {hidePwd} = this.state;

        let formStyle = hidePwd? {visibility: 'hidden'}: {visibility: 'visible'}; 

        return(
           <div className='settings'>
               <Navbar/>

               <main>
                    <h1>Account Settings</h1>
                
                    <form className='changeName' onSubmit={this.changeName}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" minLength='2' maxLength='30' onChange={this.handleChange}/>

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" minLength='2' maxLength='30' onChange={this.handleChange}/>

                        <button className='btn btn-lg btn-danger'>Change Name</button>
                    </form>

                    <div className='update' onClick={this.showForm}>{hidePwd? 'Update Password': 'Hide'}</div>

                    <form className='changePwd' onSubmit={this.changePwd} style={formStyle}>
                        <label htmlFor="currentPwd">Current Password:</label>
                        <input type="password" id="currentPwd" minLength='6' maxLength='50' onChange={this.handleChange} required/>
                    
                        <label htmlFor="newPwd">New Password:</label>
                        <input type="password" id="newPwd" minLength='6' maxLength='50' onChange={this.handleChange} required/>
            
                        <label htmlFor="confirmPwd">Confirm Password:</label>
                        <input type="password" id="confirmPwd" minLength='6' maxLength='50' onChange={this.handleChange} required/>
                    
                        <button className='btn btn-lg btn-danger'>Change Password</button>
                    </form>
               </main>
           </div>
        )
    }
}

export default Settings;