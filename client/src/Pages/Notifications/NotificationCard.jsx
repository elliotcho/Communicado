import React, { Component} from 'react'
import loading from './loading.jpg';
import axios from 'axios';
import moment from 'moment';
import {io} from '../../App';
import './NotificationCard.css'

// Notification cards that will be rendered in Notifications for each one
// R: -- ELLIOT!! status changes, asycn/await, 
class NotificationCard extends Component {
    constructor(props) {
        super(props);
        // State that will control user elements of notif
        this.state = {
            firstName: "",
            lastName: "",
            imgURL: null, 
            status: ''
        }
        this.handleRequest = this.handleRequest.bind(this);
    }

    // Mount component with users ID 
    componentDidMount(){
        // Get sender ID from notif to fetch their data and render
        const {senderId} = this.props.notif;
        const {uid} = this.props;
        const config = {'Content-Type': 'application/json'};

        // Get fName and lName of user who sent notification 
        // R: --- Asycn, Await?!
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

        axios.post('http://localhost:5000/friends/status', {receiverId: uid, senderId}, {headers: config}).then(response =>{
            this.setState({status: response.data.status});
        });
    }

    handleRequest(eventType){
        const {uid, deleteNotif} = this.props;
        const {_id, senderId} = this.props.notif;

        const {status} = this.state;

        // Delete notification once clicked
        deleteNotif(_id);

         // Send io event type to handle request of accept or decline
        io.emit(eventType , {status, receiverId: uid, senderId});
    }

    render() {
        // Destructure state and props
        const {imgURL, firstName, lastName} = this.state;
        const {content, date, friendRequest} = this.props.notif;
     
        return (
            <div className="NotificationCard card">
                <div className="row d-flex justify-content-center text-left align-items-center">
                    <div className="col-2 text-center">
                        {/* While loading for img, display placeholer */}
                        <img src={imgURL ? imgURL : loading} className="img-fluid avatar" alt="tester" />
                    </div>

                    {/* Notif body: name, content and date */}
                    <div className="col-5 NotificationCard-body">
                        <h2 className="NotificationCard-msg">
                            <strong className="NotificationCard-name">{firstName} {lastName} </strong>
                            <span className="NotificationCard-content">{content}</span>
                        </h2>
                        <h5 className="text-muted">Sent {moment(date).calendar()}</h5>
                    </div>
                   
                    {
                        friendRequest?
                        (
                            [<div className = "accept col-1 d-inline-block" key ='check-button'>
                                {/* Accept friend request */}
                                <i className="fas fa-check-square" onClick = {() => {this.handleRequest("ACCEPT_REQUEST")}}></i>
                            </div>
                            ,<div className ='reject col-1 d-inline-block' key='x-button'>
                                {/* Reject friend Request */}
                                <i className="fas fa-times-circle" onClick = {() => {this.handleRequest("DECLINE_REQUEST")}}></i>
                            </div>]
                        )
                        :[
                          <div className='col-1 d-inline-block' key='block1'/>
                         ,<div className='col-1 d-inline-block' key='block2'/>
                         ]
                    }
                </div>
            </div>
        )
    }
}

export default NotificationCard;