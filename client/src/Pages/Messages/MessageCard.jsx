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
            // <div className="MessageCard card">
            //     <div className="row">
            //         <div className="col-12">
            //             <div className="card-body">
            //                 <h5 className="card-title">Name</h5>
            //                 <p className="card-text">Some quick example text to make up the bulk of the card's content.</p>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div class="MessageCard card flex-row flex-wrap">
                <div class="card-header border-0">
                    <img src="//placehold.it/50" alt="" />
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