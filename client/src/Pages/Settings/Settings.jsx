import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveUserInfo, changeUserName, changePwd} from '../../reducers/rootReducer';
import './Settings.css';
import Navbar from '../../Partials/Navbar';


const axios=require('axios');

class Settings extends Component{
    constructor(){
        super();
    
        this.state={
            userInfo: {},
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
        this.changePwd =this.changePwd.bind(this);
    }

    componentDidMount(){
        if(this.props.userInfo._id === ''){
            this.props.saveUserInfo(JSON.parse(window.localStorage.getItem('userInfo')));

            this.setState({
                userInfo: JSON.parse(window.localStorage.getItem('userInfo'))
            }, ()=>{
                window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));        
            });
        }
        
        else{
            this.setState({
                userInfo: this.props.userInfo
            }, ()=>{
                window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));        
            });
        }
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
            id: this.state.userInfo._id,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        axios.post('http://localhost:5000/changename', data , {headers: {'content-type': 'application/json'}})
        .then(response => {
            const {_doc, msg} =response.data;

            if(_doc){
                this.props.changeUserName(_doc.firstName, _doc.lastName);
            }

            alert(msg);
        });
    }

    changePwd(e){
        e.preventDefault();

        const {userInfo, currPwd, newPwd, confirmPwd} =this.state;

        const data={id: userInfo._id, currPwd, newPwd, confirmPwd}

        axios.post('http://localhost:5000/changepwd', data, {headers:{'content-type': 'application/json'}})
        .then(response =>{
            const {_doc, msg} = response.data;

            if(_doc){
                this.props.changePwd(_doc.password);
            }

            alert(msg);
        });
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
                        <label htmlFor="currPwd">Current Password:</label>
                        <input type="password" id="currPwd" minLength='6' maxLength='50' onChange={this.handleChange} required/>
                    
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

const mapStateToProps = (state) =>{
    return {
        userInfo: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserInfo: (userInfo) => {dispatch(saveUserInfo(userInfo));},
        changeUserName: (fName, lName) =>{dispatch(changeUserName(fName, lName));},
        changePwd: (pwd) => {dispatch(changePwd(pwd));}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);