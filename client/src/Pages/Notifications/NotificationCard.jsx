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
        const {content, date, friendRequest} = this.props.notif;
        return (
            <div className="NotificationCard card">
                <div className="row d-flex justify-content-center text-left align-items-center">
                    <div className="col-2 text-center">
                        <img src={imgURL ? imgURL : loading} className="img-fluid avatar" alt="tester" />
                    </div>
                    <div className="col-5 NotificationCard-body">
                        <h2 className="NotificationCard-msg">
                            <strong className="NotificationCard-name">{firstName} {lastName} </strong>
                            <span className="NotificationCard-content">{content}</span>
                        </h2>
                        <h5 className="text-muted">Sent {moment(date).calendar()}</h5>
                    </div>
                    {/* <div className="col-2" /> */}
                    <div className="offset-2 col-1 accept">
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