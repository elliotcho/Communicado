import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {io} from '../../App';
import {getUserInfo, loadProfilePic, changeProfilePic} from '../../store/actions/profileActions';
import {findUsers, clearUsers, loadFriends, countFriends} from '../../store/actions/friendsActions';
import './Home.css';
import HomeFind from './HomeFind'
import ProfileCard from './ProfileCard'
import OnlineFriendList from './OnlineFriendList'

class Home extends Component{
    // After init render, read userID and get info + picture to display
    componentDidMount(){
        const {uid} = this.props;
        this.props.getUserInfo(uid);
        this.props.loadProfilePic(uid);
        this.props.loadFriends(uid);
        this.props.countFriends(uid);
        io.emit('GET_ONLINE_FRIENDS', {uid});
    }

    // Clear users when moving pages
    componentWillUnmount(){
        this.props.clearUsers();
    }

    render() {
        // If no UID, send user to Login page
        if (!this.props.uid) {
            return <Redirect to='/'/>
        }

        const {active, users, firstName, lastName, imgURL, uid, findUsers, dateCreated, numFriends, changeProfilePic} = this.props;
      
       
        return (
            <div className='home'>
                {/* Make container 100% height of the 92vh from css */}
                <div className="container-fluid h-100">
                    <div class="row homeRow">
                        
                        <div class="col"></div>


                        <HomeFind uid={uid} findUsers={findUsers} users={users}/>  

                        <ProfileCard 
                            uid={uid} 
                            firstName={firstName} 
                            lastName={lastName} 
                            imgURL={imgURL} 
                            numFriends={numFriends}
                            dateCreated = {dateCreated}
                            changeProfilePic={changeProfilePic}
                        />
                      
                        <OnlineFriendList active={active}/>
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
        imgURL: state.profile.imgURL,
        active: state.friends.active,
        users: state.friends.users,
        numFriends: state.friends.numFriends
    }
};

// Map all methods to props using redux
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        loadProfilePic: (uid) => {dispatch(loadProfilePic(uid));},
        changeProfilePic: (uid, imgFile) => {dispatch(changeProfilePic(uid, imgFile));},
        findUsers: (name, uid) => {dispatch(findUsers(name, uid));},
        clearUsers: () => {dispatch(clearUsers());},
        loadFriends: (uid) =>  {dispatch(loadFriends(uid));},
        countFriends: (uid) =>  {dispatch(countFriends(uid));},
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)); 