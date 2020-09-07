import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadFriends} from '../../store/actions/friendsActions';
import FriendCard from '../../Partials/FriendCard';

// Grid for friend cards of all a users' friends
class FriendGrid extends Component {
    // After init render, load friends of current user
    componentDidMount(){
        this.props.dispatch(loadFriends(this.props.uid));
    }

    render() {
        // Destructure props
        const {uid, dispatch} = this.props;

        // Create friend card for each friend in array and store in variable
        const friends = this.props.friends.map(friend =>
            <FriendCard 
                // Pass all needed information about each friend and all functionality
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
                    {/* Render each FriendCard */}
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

// Store needed methods in props from client action store 
const mapDispatchToProps = (dispatch) =>  ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(FriendGrid);