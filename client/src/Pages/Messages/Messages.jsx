import React, { Component } from 'react';
import Navbar from '../../Partials/Navbar';
import MessageList from './MessageList'
import './Messages.css'

class Messages extends Component {
    render() {
        return (
            <div className="Messages">
                <Navbar />
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <MessageList />
                        </div>
                        <div className="col-8">
                            <h2>Message Expanded</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Messages;