import React, { Component } from 'react'
import MessageCard from './MessageCard'
import './MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unreadMessages: []
        }
    }
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