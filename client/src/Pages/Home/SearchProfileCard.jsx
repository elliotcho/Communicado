import React, { Component } from 'react';
import axios from 'axios';
import loading from '../../images/loading.jpg';
import {io} from '../../App';
import './SearchProfileCard.css';

class SearchProfileCard extends Component {
    constructor(){
        super();

        this.state ={
            imgURL: null,
            status: 'Add Friend'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        const {_id} = this.props.user;
        const {uid} = this.props;

        const config = {headers: {'content-type': 'application/json'}};

        let response = await fetch(`http://localhost:5000/users/profilepic/${_id}`, {method: 'GET'}); 
        const file = await response.blob();

        response = await axios.post('http://localhost:5000/friends/status', {receiverId: _id, senderId: uid}, config);
        const {status} = response.data;

        this.setState({
            status,
            imgURL: URL.createObjectURL(file)
        });
    }

    // Send friend request to client when user clicks btn to add friend
    handleClick(){
        // Destructure
        const {status} = this.state;
        const {uid} = this.props;
        const {_id, firstName, lastName} = this.props.user;

        // Add Friend button
        if(status === 'Add Friend'){
            io.emit("CHANGE_FRIEND_STATUS", {status, uid, friendId: _id});
            this.setState({
                status: 'Pending'
            });
        }
        // Pending Button
        else if(status === 'Pending'){
            io.emit("CHANGE_FRIEND_STATUS", {status, uid, friendId: _id});
            this.setState({
                status: 'Add Friend'
            });
        }
        // Already friends. If clicked, will delete friend from friend list if user confirms
        else {
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
        const {firstName, lastName, _id} = this.props.user;
        const {uid} = this.props;
        const {imgURL, status} = this.state;

        return(
            <div>
                <div className = "searchProfileCard">
                    <div class="row sideBar-body">
                    
                        <div class="col-sm-3 sideBar-avatar">
                            <div>
                                <img src={imgURL? imgURL:loading} class="avatar-icon"></img>
                            </div>
                        </div>
                        <div class="col-sm-9 sideBar-main">
                            
                                <div class="col-sm-8 sideBar-name">
                                    <span class="name-meta">{firstName} {lastName}</span>
                                </div>
                                
                                <div class="col-sm-3 float-right sideBar-time">
                                    {uid !== _id ?
                                        (<div onClick = {this.handleClick}>
                                            {status === 'Add Friend'? <i className="fas fa-user-plus mb-2"></i>:
                                            status === 'Pending'? <i className ='fas fa-user-clock mb-2'/> :
                                            <i className ='fa fa-check mb-2'/>}
                                        </div>): null
                                    }     
                                </div>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchProfileCard