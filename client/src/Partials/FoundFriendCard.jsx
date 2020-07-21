import React, { Component } from 'react'
import { connect } from 'react-redux';
import './FoundFriendCard.css'

import socket from 'socket.io-client';

class FoundFriendCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgURL: "//placehold.it/10"
        }
        this.handleClick = this.handleClick.bind(this);
    }
    // Once rendered, load img of user from DB
    componentDidMount(){
        const {_id} = this.props.user;

        const data = {action: 'load', uid: _id};
        const config={'Content-Type': 'application/json'};
        
        // Fetch from server functional route using post with stringified data
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    handleClick(){
        const {uid} = this.props;

        const {_id} = this.props.user;

        const io = socket('http://localhost:5000');
        
        io.emit("FRIEND_REQUEST", {uid, friendId: _id});
    }

    render() {
        const {firstName, lastName} = this.props.user;
        const {imgURL} = this.state;

        return (
            <div className="FoundFriendCard card col-lg-2 col-sm-4 col-6">
                <img src={imgURL} className="card-img" alt="user icon" id="userIcon"/>
                <div className="card-body">
                    <h5 className="card-title text-center">
                        {firstName} {lastName}
                    </h5>
                </div>
                <div className="card-footer text-center" onClick = {this.handleClick}>
                        <i className="fas fa-user-plus"></i>
                </div>
            </div>
        )
    }
}

// put data from reducer into props
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users,
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(FoundFriendCard);