import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo, changeUserName, changePwd, deleteUser} from '../../store/actions/profileActions';
import {Redirect} from 'react-router-dom';
import './Settings.css';

// Settings Page
class Settings extends Component{
    constructor(props){
        super(props);
        // Form variables
        this.state={
            firstName: '',
            lastName: '',
            currPwd: '',
            newPwd: '',
            confirmPwd: '',
            hidePwd: true, 
        }
        this.showForm = this.showForm.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.changeName=this.changeName.bind(this);
        this.changePwd=this.changePwd.bind(this);
        this.deleteUser= this.deleteUser.bind(this);
    }

    // After init render, retrieve userID
    componentDidMount(){
        this.props.getUserInfo(this.props.uid);
    }

    // Show additional form to change password
    showForm(){
        let { hidePwd } = this.state;
        this.setState({
            hidePwd: !hidePwd
        });
    }
    // Update state for each change in form
    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // Change a users name once submitted
    changeName(e){
         
        e.preventDefault();

        // Destructure 
        const {uid, changeUserName} = this.props;
        const {firstName, lastName} = this.state;

        // Empty state
        this.setState({firstName: "",lastName:""});

        // Change name based on what is given in redux client store
        changeUserName(uid, firstName, lastName);
    }

    // Change password 
    changePwd(e){
        e.preventDefault();

        // Destructure
        const {uid} = this.props;
        const  {currPwd, newPwd, confirmPwd} = this.state;

        // Empty state
        this.setState({
            currPwd: "",
            newPwd: "", 
            confirmPwd: ""
        })

        // Change password based on what is given in redux client store
        this.props.changePwd(uid, currPwd, newPwd, confirmPwd);
    }

    // Delete User - Prompts user to confirm account deletion
    deleteUser(e){
        e.preventDefault();

        // Show window to delete
        if(!window.confirm("Are you sure you want to delete your account?")){
            return;
        }

        // If yes, delete
        const {uid} = this.props;
        this.props.deleteUser(uid);  
    }

    render(){
        // If no user, go to Login
        if(!this.props.uid){
            return <Redirect to = '/'/>
        }

        // Destructure
        const {hidePwd, firstName, lastName, currPwd, newPwd, confirmPwd} = this.state;
        // Variable to show if form is hidden or not
        let formStyle = hidePwd? {display: 'none'}: {display: 'block'}; 

        return(
           <div className='settings'>
               <main>
                    <h1>Account Settings</h1>
                
                    <form className='changeName' onSubmit={this.changeName}>
                        {/* First name */}
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" minLength='2' maxLength='30' onChange={this.handleChange} value={firstName}/>
                        {/* Last name */}
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" minLength='2' maxLength='30' onChange={this.handleChange} value={lastName}/>
                        {/* Submit name change */}
                        <button className='btn btn-lg btn-success'>Change Name</button>
                    </form>
                    {/* Show password toggle button */}
                    <div className='update' onClick={this.showForm}>{hidePwd? 'Update Password': 'Hide'}</div>
                    {/* Hidden form to update pwd */}
                    <form className='changePwd' onSubmit={this.changePwd} style={formStyle}>
                        {/* current Password */}
                        <label htmlFor="currPwd">Current Password:</label>
                        <input type="password" id="currPwd" minLength='6' maxLength='50' onChange={this.handleChange} value={currPwd} required/>
                        {/* New password */}
                        <label htmlFor="newPwd">New Password:</label>
                        <input type="password" id="newPwd" minLength='6' maxLength='50' onChange={this.handleChange} value={newPwd} required/>
                        {/* New password again*/}
                        <label htmlFor="confirmPwd">Confirm Password:</label>
                        <input type="password" id="confirmPwd" minLength='6' maxLength='50' onChange={this.handleChange} value={confirmPwd} required/>
                        {/* Submit btn */}
                        <button className='btn btn-lg btn-success'>Change Password</button>
                    </form>
                     
                    <form  onSubmit={this.deleteUser}>
                        <button className='delete btn btn-lg btn-danger'>Delete Account</button>
                    </form>
               </main>
           </div>
        )
    }
}

// Map variables to state from store
const mapStateToProps = (state) =>{
    return {
        uid: state.auth.uid,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName
    }
};

// Map functions to props from store
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        changeUserName: (uid, firstName, lastName) =>{dispatch(changeUserName(uid, firstName, lastName));},
        changePwd: (pwd, currPwd, newPwd, confirmPwd) => {dispatch(changePwd(pwd, currPwd, newPwd, confirmPwd));},
        deleteUser: (uid) =>{dispatch(deleteUser(uid));}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);