import React, { Component } from 'react';
import axios from 'axios';
import './MessageCard.css';
import {withRouter} from 'react-router-dom';

class MessageCard extends Component {
    constructor(){
        super();
        this.state = {
            memberNames: 'Loading Users...',
            imgURL: null
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(){
        const {chatId} = this.props;
        this.props.history.push(`/chat/${chatId}`);
    }

    async componentDidMount(){
        const {uid, chatId} = this.props;

        let response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId});
        const {memberNames} = response.data;

        response = await axios.post('http://localhost:5000/chats/chatpic', {uid, chatId});
        const {members} = response.data;

        //get profile picture of the user on the card
        response = await fetch(`http://localhost:5000/users/profilepic/${members[0]}`, {
            method: 'GET'
        }); 
            
        let file = await response.blob();

        this.setState({
            memberNames,
            imgURL: URL.createObjectURL(file)
        });
    }

    render() {
        const {memberNames, imgURL} = this.state;
        
        const {isActive} = this.props;

        const cardClassName = (isActive)? 'active': ''

        return (
            <div onClick={this.handleClick} className={`MessageCard ${cardClassName} card flex-row flex-wrap`}>
                <div class="card-header border-0">
                    <img src={imgURL?  imgURL : "//placehold.it/50"} alt="profile pic" />
                </div>
                <div class="card-block px-2">
                    <h3 class="card-title">{memberNames}</h3>
                    <p class="card-text">Message</p>
                </div>
            </div>
        )
    }
}
export default withRouter(MessageCard);