import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadFriends} from '../../store/actions/friendsActions';
import FriendCard from '../../Partials/FriendCard';

// A grid for friend cards of all a users' friends
class FriendGrid extends Component {
    // After init render, load friends of current user
    componentDidMount(){
        this.props.dispatch(loadFriends(this.props.uid));
    }

    render() {
        // Destructure props
        const {uid, dispatch} = this.props;

        // Create friend card for each friend in array and pass as props
        const friends = this.props.friends.map(friend =>
            <FriendCard 
                key = {friend._id}
                user = {friend} 
                uid = {uid}
                friends = {this.props.friends}
                dispatch = {dispatch}
            />
        );

        return (
            <div className="FriendGrid">
                {/* Bootstrap Grid that creates new row every 2 cards */}
                <div className="row row-cols-2">
                    {/* Render all FriendCards */}
                     {friends}
                </div>
            </div>
        )
    }
}

// Store needed variables into state
const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        friends: state.friends.friends
    }
}

// Store dispatch to access actions from client store 
const mapDispatchToProps = (dispatch) =>  ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(FriendGrid);