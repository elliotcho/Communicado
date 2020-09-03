import React, { Component } from 'react';
import MessageCard from './MessageCard';
import './MessageList.css'
import { readChat } from '../../store/actions/messagesActions';

class MessageList extends Component {
    componentDidMount(){
        const {uid, loadChats} = this.props;
        
        loadChats(uid);
    }

    render() {
        const {uid, dispatch} = this.props;
        const chatOnDisplay = this.props.chatId;
        
        const chats = this.props.chats.map(chat => 
            <MessageCard
                key = {chat._id}
                chatId = {chat._id}
                uid = {uid}
                isActive = {chatOnDisplay === chat._id}
                lastMsg = {chat.messages[chat.messages.length -1]}
                dispatch = {dispatch}
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