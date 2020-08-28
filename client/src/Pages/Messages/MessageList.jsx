import React, { Component } from 'react';
import MessageCard from './MessageCard';
import './MessageList.css'

class MessageList extends Component {
    componentDidMount(){
        const {uid, loadChats} = this.props;
        
        loadChats(uid);
    }

    render() {
        const {uid} = this.props;
        const chatOnDisplay = this.props.chatId;
        
        const chats = this.props.chats.map(chat => 
            <MessageCard
                key = {chat._id}
                chatId = {chat._id}
                uid = {uid}
                isActive = {chatOnDisplay === chat._id}
                lastMsg = {chat.messages[chat.messages.length -1]}
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