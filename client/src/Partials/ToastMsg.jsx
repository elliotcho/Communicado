import React, {Component} from 'react';
import './ToastMsg.css';
import {withRouter} from 'react-router-dom';
import loading from './loading.jpg';
import axios from 'axios';

// Toast Msg for new notification
class ToastMsg extends Component{
    constructor(){
        super();
        // Init state
        this.state = {
            firstName: 'Loading...',
            lastName: 'User...', 
            imgURL: null
        }
        this.toNotifs = this.toNotifs.bind(this);
    }

    // Load toast data with axios
    async componentDidMount(){
        const {toastId} = this.props;

        let response = await axios.get(`http://localhost:5000/users/${toastId}`);
        const {firstName, lastName} = response.data;
        
        response = await fetch(`http://localhost:5000/users/profilepic/${toastId}`, {method: 'GET'});    
        let file = await response.blob();

        this.setState({
            firstName,
            lastName,
            imgURL: URL.createObjectURL(file)
        });
    }

    // Send user to notifications once clicked
    toNotifs(e){
        e.preventDefault();
        // Check if already on notifications
        const {pathname} = this.props.location;
        if(pathname !== '/notifications'){
            this.props.history.push('/notifications');
        }
        // If already on, reload page
        else{
            window.location.reload();
        }
    }

    render(){
        // Destructure
        const {msg} = this.props;
        const {firstName, lastName, imgURL} = this.state;

        //R: Make message card responsive, use real code and not dummy code
        return(
            <div onClick = {this.toNotifs} className ='toast-notif row'>
                <img src = {imgURL? imgURL: loading} className ='col-5' alt ='profile pic'/>
            
                <div className ='col-7 mt-2'>
                    <strong>{firstName} {lastName}</strong>
                    <span> {msg}</span>
                </div>
            </div>
        )
    }
}

export default withRouter(ToastMsg);