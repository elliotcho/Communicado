import React, { Component } from 'react';
import axios from 'axios';
import './MessageCard.css';

class MessageCard extends Component {
    constructor(){
        super();
        this.state = {
            memberNames: 'Loading Users...'
        }
    }

    async componentDidMount(){
        const {uid, chatId} = this.props;

        const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId});
        const {memberNames} = response.data;

        this.setState({memberNames});
    }

    render() {
        const {memberNames} = this.state;

        return (
            <div class="MessageCard card flex-row flex-wrap">
                <div class="card-header border-0">
                    <img src="//placehold.it/50" alt="profile pic" />
                </div>
                <div class="card-block px-2">
                    <h3 class="card-title">{memberNames}</h3>
                    <p class="card-text">Message</p>
                </div>
            </div>
        )
    }
}
export default MessageCard;