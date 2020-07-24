import React, { Component } from 'react'
import loading from './loading.jpg';
import axios from 'axios';
import moment from 'moment';
import './NotificationCard.css'

class NotificationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            imgURL: null
        }
    }
    // Mount component with usersID 
    componentDidMount(){
        const {senderId} = this.props.notif;
        const config = {'Content-Type': 'application/json'};
        // Get fName and lName of user who sent notification 
        axios.post('http://localhost:5000/userinfo', {uid: senderId}, {headers: config}).then(response =>{
            const {firstName, lastName} = response.data;
            // Store names in state of Card
            this.setState({
                firstName, lastName
            });
        });
        // Load data of sender
        const data = {action: 'load', uid: senderId};
        // Fetch from server functional route using post with stringified data
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display senders IMG
            this.setState({imgURL: URL.createObjectURL(file)});
        });
       
    }

    
    render() {
        const {imgURL, firstName, lastName} = this.state;
        const {content, date, friendRequest} = this.props;
        return (
            <div className="NotificationCard card">
                <div className="row d-flex justify-content-center text-center align-items-center">
                    <div className="col-2">
                        <img src={imgURL ? imgURL : loading} className="img-fluid avatar" alt="tester" />
                    </div>
                    <div className="col-4">
                        <h1>{firstName} {lastName}</h1>
                        <h3>has sent you a friend request</h3>
                    </div>
                    <div className="col-1">
                        <h5>sent {moment(date).calendar()}</h5>
                    </div>
                    <div className="col-1" />
                    <div className="col-1 accept">
                        <i className="fas fa-check-square"></i>
                    </div>
                    <div className="col-1 reject">
                        <i className="fas fa-times-circle"></i>
                    </div>
                    <div className="col-1" />
                </div>
            </div>
        )
    }
}

export default NotificationCard;