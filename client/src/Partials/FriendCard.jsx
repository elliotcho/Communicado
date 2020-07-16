import React, { Component } from 'react'
import './FriendCard.css'

class FriendCard extends Component {
    render() {
        return (
            <div className="col-lg-6 col-sm-12 d-flex justify-content-center">
                <div className="FriendCard card bg-light mb-5">
                    <div className="row d-flex justify-content-center text-center no-gutters align-items-center">
                        <div className="col-3 d-flex justify-content-center">
                            <img src="//placehold.it/30" className="img-fluid avatar" alt="tester" />
                        </div>
                        <div className="col-7">
                            <h3 className="card-title">Gugsa Challa</h3>
                        </div>
                        <div className="col-1 delete">
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="col-1 msg">
                            <i className="far fa-comment-dots"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FriendCard;