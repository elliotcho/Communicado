import React, { Component } from 'react'
import MessageCard from './MessageCard'
import './MessageList.css'


class MessageList extends Component {
    render() {
        return (
            <div className="MessageList">
                <MessageCard />
                <MessageCard />
                <MessageCard />
            </div>
        )
    }
}
export default MessageList;