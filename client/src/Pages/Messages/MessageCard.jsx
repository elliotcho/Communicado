import React, { Component } from 'react'
import './MessageCard.css'

class MessageCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unread: true
        }
    }
    render() {
        return (
            <div className="MessageCard card">
                <div className="row">
                    <div className="col-12">
                        <p>Im a message!</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default MessageCard;