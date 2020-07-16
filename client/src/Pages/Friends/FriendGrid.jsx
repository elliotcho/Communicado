import React, { Component } from 'react'
import FriendCard from '../../Partials/FriendCard'

class FriendGrid extends Component {
    render() {
        return (
            <div className="FriendGrid">
                <div className="row row-cols-2">
                     <FriendCard />
                     <FriendCard />
                     <FriendCard />
                     <FriendCard />
                </div>
            </div>
        )
    }
}

export default FriendGrid;