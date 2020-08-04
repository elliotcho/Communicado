import React, { Component } from 'react';
import {connect} from 'react-redux';
import {findUsers, findFriends} from '../../store/actions/friendsActions';
import FindForm from '../../Partials/FindForm'
import FilterForm from '../../Partials/FilterForm'
import FriendGrid from './FriendGrid'
import './Friends.css'

// Friends Page composed of separate components that make up the page
class Friends extends Component {
    render() {
        const {findUsers, findFriends, users, friends, uid} = this.props;
        return (
            <div className="Friends">
                <div className="container-fluid">
                    <FindForm findUsers = {findUsers} users = {users} uid = {uid}/>
                    <FilterForm findFriends = {findFriends} uid = {uid}/>
                    <FriendGrid />
                </div>
            </div>
        )
    }
}

//put data from reducer into props to store current users ID and the users found (variables for props)
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users,
        uid: state.auth.uid
    }
}

//puts actions into props - All the methods for props
const mapDispatchToProps = (dispatch) =>{
    return {
        findUsers: (name, uid) => {dispatch(findUsers(name, uid));},
        findFriends: (name, uid) => {dispatch(findFriends(name, uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);