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
    componentDidMount(){
        const {toastId} = this.props;

        const data = {action: 'load', uid: toastId};
        const config={'Content-Type': 'application/json'};

        axios.post('http://localhost:5000/userinfo', {uid: toastId}, {headers: config}).then(response =>{
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });
        
        // Fetch from server functional route using post with stringified data
        // R: -- Async/Await
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display
            this.setState({imgURL: URL.createObjectURL(file)});
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