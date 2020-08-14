import React, { Component } from 'react';
import SearchMsgs from './SearchMsgs';
import MessageCard from './MessageCard';
import './MessageList.css'


class MessageList extends Component {
    render() {
        return (
            <div className="MessageList">
                <MessageCard/>
                <MessageCard/>
            </div>
        )
    }
}
export default MessageList;