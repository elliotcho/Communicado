import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import './FoundFriendCard.css'

import {io} from '../App';

class FoundFriendCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            imgURL: "//placehold.it/10",
            status: 'Add Friend'
        }
        
        this.handleClick = this.handleClick.bind(this);
    }
    // Once rendered, load img of user from DB
    componentDidMount(){
        const {_id} = this.props.user;
        const {uid} = this.props;

        const data = {action: 'load', uid: _id};
        const config={'Content-Type': 'application/json'};
        
        // Fetch from server functional route using post with stringified data
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display
            this.setState({imgURL: URL.createObjectURL(file)});
        });

        axios.post('http://localhost:5000/friends/status', {receiverId: _id, senderId: uid}, {headers: config}).then(response =>{
            this.setState({status: response.data.status});
        });
    }

    // Send friend request to client when user clicks btn to add friend
    handleClick(){
        const {status} = this.state;

        const {uid} = this.props;

        const {_id, firstName, lastName} = this.props.user;

        if(status === 'Add Friend'){
            io.emit("CHANGE_FRIEND_STATUS", {status, uid, friendId: _id});

            this.setState({
                status: 'Pending'
            });
        }

        else if(status === 'Pending'){
            io.emit("CHANGE_FRIEND_STATUS", {status, uid, friendId: _id});

            this.setState({
                status: 'Add Friend'
            });
        }

        else{
            if(!window.confirm(`Are you sure you want to unfriend ${firstName} ${lastName}?`)){
                return;
            }
            
            io.emit("CHANGE_FRIEND_STATUS", {status, uid, friendId: _id});

            this.setState({
                status: 'Add Friend'
            });
        }
    }

    render() {
        const {_id, firstName, lastName} = this.props.user;

        const {uid} = this.props;
        
        const {imgURL, status} = this.state;

        return (
            <div className="FoundFriendCard card col-lg-2 col-sm-4 col-6 mb-2">
                <img src={imgURL} className="card-img" alt="user icon" id="userIcon"/>
                <div className="card-body">
                    <h5 className="card-title text-center">
                        {firstName} {lastName}
                    </h5>
                </div>

                {uid !== _id ?
                (<div className="card-footer text-center" onClick = {this.handleClick}>
                        {status === 'Add Friend'? <i className="fas fa-user-plus mb-2"></i>:
                        status === 'Pending'? <i className ='fas fa-user-clock mb-2'/> :
                        <i className ='fa fa-check mb-2'/> 
                        }      
                </div>)
                :null 
                }
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