import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as friendActions from '../../store/actions/friendsActions';
import {getUserInfo} from '../../store/actions/profileActions';
import HomeFind from './HomeFind';
import ProfileCard from './ProfileCard';
import OnlineFriendList from './OnlineFriendList';
import {io} from '../../App';
import './Home.css';

class Home extends Component{
    // After init render, read userID and get info + picture to display
    componentDidMount(){
        const {uid, dispatch} = this.props;
        const {loadFriends, countFriends} = friendActions;
        
        dispatch(getUserInfo(uid));
        dispatch(loadFriends(uid));
        dispatch(countFriends(uid));
        
        io.emit('GET_ONLINE_FRIENDS', {uid});
    }

    // Clear users when moving pages
    componentWillUnmount(){
        const {dispatch} = this.props;
        const {clearUsers} = friendActions;

        dispatch(clearUsers());
    }

    render() {
        const {uid, dispatch, firstName, lastName, dateCreated, active, users, numFriends} = this.props;

        // If no UID, send user to Login page
        if (!uid) {
            return <Redirect to='/'/>
        }
       
        return (
            <div className='home'>
                {/* Make container 100% height of the 92vh from css */}
                <div className="container-fluid h-100">
                    <div class="row homeRow">
                        
                        <div class="col"></div>

                        <HomeFind 
                            dispatch = {dispatch}
                            uid={uid} 
                            users={users}
                        />  

                        <ProfileCard 
                            uid = {uid} 
                            firstName = {firstName} 
                            lastName = {lastName} 
                            numFriends = {numFriends}
                            dateCreated = {dateCreated}
                            dispatch = {dispatch}
                        />
                      
                        <OnlineFriendList active = {active}/>
                        
                        <div class="col"></div>
                    </div>
                </div>
            </div>
        )
    }
}

// Map all variables to props using redux
const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        dateCreated: state.profile.dateCreated,
        active: state.friends.active,
        users: state.friends.users,
        numFriends: state.friends.numFriends
    }
};

// Map all methods to props using redux
const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)); 