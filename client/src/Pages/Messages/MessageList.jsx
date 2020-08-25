import React, { Component } from 'react';
import MessageCard from './MessageCard';
import axios from 'axios';
import './MessageList.css'

class MessageList extends Component {
    componentDidMount(){
        const {uid, loadChats} = this.props;
        
        loadChats(uid);
    }

    render() {
        const {uid} = this.props;

        const chats = this.props.chats.map(chat =>
            <MessageCard
                key = {chat._id}
                chatId = {chat._id}
                uid = {uid}
            />
        );

        return (
            <div className="MessageList">
                {chats}
            </div>
        )
    }
}
export default MessageList;