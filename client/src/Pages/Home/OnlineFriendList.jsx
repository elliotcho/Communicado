import React, { Component } from 'react'
import OnlineFriend from './OnlineFriend'

class OnlineFriendList extends Component {
    render() {
        const {active} = this.props;
        const onlineFriends = active.map(user =>
            <OnlineFriend key={user._id} user={user} status={'online'}/>
        );

        return (
            <div className="OnlineFriendList col-lg-3">
                <div className="card text-center d-flex justify-content-center homeCard w-100 h-100">
                    
                    {/* Card Header */}
                    <div className="card-header rounded-0 cardTitle">
                        <h1 className="display-4">Online Friends</h1>
                    </div>

                    {/* Card Body - List of online friends from props */}
                    <div className="card-body">
                        {onlineFriends}
                    </div>

                </div>
            </div>
        )
    }
}
export default OnlineFriendList; 