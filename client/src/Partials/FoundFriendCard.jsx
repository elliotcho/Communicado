import React, { Component } from 'react'
import { connect } from 'react-redux';
import './FoundFriendCard.css'

class FoundFriendCard extends Component {
    render() {
        return (
            <div className="FoundFriendCard card col-2">
                <img src="//placehold.it/10" className="card-img-top" alt="user icon" id="userIcon"/>
                <div className="card-body">
                    <h5 className="card-title">Name</h5>
                </div>
                <div className="card-footer">
                    Add btn
                </div>
            </div>
        )
    }
}

// put data from reducer into props
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users,
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(FoundFriendCard);