import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadFriends} from '../../store/actions/friendsActions';
import FriendCard from '../../Partials/FriendCard';

class FriendGrid extends Component {
    componentDidMount(){
        this.props.loadFriends(this.props.uid);
    }

    render() {
        const friends = this.props.friends.map(friend =>
            <FriendCard user = {friend}/>
        );

        return (
            <div className="FriendGrid">
                {/* Bootstrap Grid that creates new row every 2 cards */}
                <div className="row row-cols-2">
                     {friends}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        friends: state.friends.friends
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        loadFriends: (uid) => {dispatch(loadFriends(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendGrid);