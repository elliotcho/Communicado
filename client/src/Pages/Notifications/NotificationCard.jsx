import React, { Component, Fragment } from 'react'
import loading from './loading.jpg';
import axios from 'axios';
import moment from 'moment';
import {io} from '../../App';
import './NotificationCard.css'

class NotificationCard extends Component {
    constructor(props) {
        super(props);
        // State that will control user elements of notif
        this.state = {
            firstName: "",
            lastName: "",
            imgURL: null
        }
        this.handleRequest = this.handleRequest.bind(this);
    }
    // Mount component with usersID 
    componentDidMount(){
        // Get sender ID from notif to fetch their data and render
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
    handleRequest(eventType){
        const {uid, deleteNotif} = this.props;
        const {_id, senderId} = this.props.notif;
        // Delete notification once clicked
        deleteNotif(_id);
        // Send io event type to handle request of accept or decline
        io.emit(eventType , {receiverId: uid, senderId});
    }

    render() {
        // Destructure state and props
        const {imgURL, firstName, lastName} = this.state;
        const {content, date, friendRequest, read} = this.props.notif;
        // Render diff bg colour if read or not
        const bg = (read)? {background: 'white'}: {background: 'lightgray'} ;

        return (
            <div className="NotificationCard card" style={bg}>
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
                    <Fragment>
                        <div className="btns">
                            <div className="offset-2 col-1 accept">
                                {/* Accept friend request */}
                                <i className="fas fa-check-square" onClick = {() => {this.handleRequest("ACCEPT_REQUEST")}}></i>
                            </div>
                            <div className="col-1 reject">
                                {/* Reject friend Request */}
                                <i className="fas fa-times-circle" onClick = {() => {this.handleRequest("DECLINE_REQUEST")}}></i>
                            </div>
                            <div className="col-1" />
                        </div>
                    </Fragment>
                </div>
            </div>
        )
    }
}

export default NotificationCard;