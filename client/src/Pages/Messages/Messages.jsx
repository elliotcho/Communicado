import React, { Component } from 'react';
import Navbar from '../../Partials/Navbar';
import MessageList from './MessageList'
import ExpandChat from './ExpandChat';
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

                        <div className="expandChat-container col-8">
                            <ExpandChat/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Messages;