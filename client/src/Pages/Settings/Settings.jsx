import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getUserInfo, changeUserName, changePwd} from '../../store/actions/profileActions';
import './Settings.css';
import Navbar from '../../Partials/Navbar';

class Settings extends Component{
    constructor(){
        super();
    
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
    }

    componentDidMount(){
        this.props.getUserInfo(this.props.uid);
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

        const {uid, changeUserName} =this.props;
        const {firstName, lastName} =this.state;

        this.setState({
            firstName: "",
            lastName:""
        });

        changeUserName(uid, firstName, lastName);
    }

    changePwd(e){
        e.preventDefault();

        const {uid} = this.props;
        const  {currPwd, newPwd, confirmPwd} =this.state;

        this.setState({
            currPwd: "",
            newPwd: "", 
            confirmPwd: ""
        })

        this.props.changePwd(uid, currPwd, newPwd, confirmPwd);
    }

    render(){
        if(!this.props.uid){
            return <Redirect to = '/'/>
        }

        const {hidePwd, firstName, lastName, currPwd, newPwd, confirmPwd} = this.state;

        let formStyle = hidePwd? {visibility: 'hidden'}: {visibility: 'visible'}; 

        return(
           <div className='settings'>
               <Navbar/>

               <main>
                    <h1>Account Settings</h1>
                
                    <form className='changeName' onSubmit={this.changeName}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" minLength='2' maxLength='30' onChange={this.handleChange} value={firstName}/>

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" minLength='2' maxLength='30' onChange={this.handleChange} value={lastName}/>

                        <button className='btn btn-lg btn-danger'>Change Name</button>
                    </form>

                    <div className='update' onClick={this.showForm}>{hidePwd? 'Update Password': 'Hide'}</div>

                    <form className='changePwd' onSubmit={this.changePwd} style={formStyle}>
                        <label htmlFor="currPwd">Current Password:</label>
                        <input type="password" id="currPwd" minLength='6' maxLength='50' onChange={this.handleChange} value={currPwd} required/>
                    
                        <label htmlFor="newPwd">New Password:</label>
                        <input type="password" id="newPwd" minLength='6' maxLength='50' onChange={this.handleChange} value={newPwd} required/>
            
                        <label htmlFor="confirmPwd">Confirm Password:</label>
                        <input type="password" id="confirmPwd" minLength='6' maxLength='50' onChange={this.handleChange} value={confirmPwd} required/>
                    
                        <button className='btn btn-lg btn-danger'>Change Password</button>
                    </form>
               </main>
           </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        uid: state.auth.uid,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        changeUserName: (uid, firstName, lastName) =>{dispatch(changeUserName(uid, firstName, lastName));},
        changePwd: (pwd, currPwd, newPwd, confirmPwd) => {dispatch(changePwd(pwd, currPwd, newPwd, confirmPwd));}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);