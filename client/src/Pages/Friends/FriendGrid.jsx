import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadFriends, removeFriend} from '../../store/actions/friendsActions';
import FriendCard from '../../Partials/FriendCard';

class FriendGrid extends Component {
    componentDidMount(){
        this.props.loadFriends(this.props.uid);
    }

    render() {
        const {uid, removeFriend} = this.props;

        const friends = this.props.friends.map(friend =>
            <FriendCard 
                key = {friend._id}
                user = {friend} 
                uid = {uid}
                friends = {this.props.friends}
                removeFriend = {removeFriend}
            />
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
        loadFriends: (uid) => {dispatch(loadFriends(uid));},
        removeFriend: (friendId, friends) => {dispatch(removeFriend(friendId, friends));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendGrid);