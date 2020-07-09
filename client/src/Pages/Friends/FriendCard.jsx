import React, { Component } from 'react'
import './FriendCard.css'

class FriendCard extends Component {
    render() {
        return (
            <div className="col-md-6 col-sm-12">
                <div className="FriendCard card">
                    <div className="row">
                        <div className="col-3">
                            <img src="//placehold.it/50" className="img-fluid" alt="tester" />
                        </div>
                        <div className="col-6">
                            <h5 className="card-title">Gugsa Challa</h5>
                        </div>
                        <div className="col-3">
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FriendCard;