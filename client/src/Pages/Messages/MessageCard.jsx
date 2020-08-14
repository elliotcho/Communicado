import React, { Component } from 'react'
import './MessageCard.css'

class MessageCard extends Component {
    render() {
        return (
            <div class="MessageCard card flex-row flex-wrap">
                <div class="card-header border-0">
                    <img src="//placehold.it/50" alt="profile pic" />
                </div>
                <div class="card-block px-2">
                    <h3 class="card-title">Name</h3>
                    <p class="card-text">Message</p>
                </div>
            </div>
        )
    }
}
export default MessageCard;