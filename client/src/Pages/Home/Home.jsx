import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {io} from '../../App';
import {getUserInfo, loadProfilePic, changeProfilePic} from '../../store/actions/profileActions';
import {findUsers, clearUsers} from '../../store/actions/friendsActions';
import './Home.css';
import HomeFind from './HomeFind'
import OnlineFriend from './OnlineFriend'
import ProfileCard from './ProfileCard'
import SearchProfileCard from './SearchProfileCard'


class Home extends Component{
    constructor(props){
        super(props);
        this.toSettings = this.toSettings.bind(this);
    }

    // After init render, read userID and get info + picture to display
    componentDidMount(){
        const {uid} = this.props;
        this.props.getUserInfo(uid);
        this.props.loadProfilePic(uid);
        io.emit('GET_ONLINE_FRIENDS', {uid});
    }

    toSettings(){
        this.props.history.push('/settings');
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

        const {active, inactive, users} = this.props;

        const onlineFriends = active.map(user =>
            <OnlineFriend key={user._id} user={user} status={'online'}/>
        );

        const offlineFriends = inactive.map(user =>
            <OnlineFriend key = {user._id} user={user} status={'offline'}/>
        );

        const {uid, findUsers} = this.props;

        return(
            <div className='home'>
                <div className="container-fluid">
                    <div class="row">
                        <div class="col"></div>
                        
                        <HomeFind uid={uid} findUsers={findUsers}/>    
                        
                        <ProfileCard />
     
                        <div class="col-lg-3">
                            <div class="card text-center h-100">
                                <div class="card-header">
                                    <h1>Online Friends</h1>
                                </div>
                                    <div class="card-body">
                                        {onlineFriends}

                                </div>
                                <div class="card-heading">
                                    <h1>Offline Friends</h1>
                                </div>
                                    <div class="card-body">
                                       {offlineFriends}
                                    </div>
                                    <div class="card-footer fill">
                                
                                    </div>  
                                </div>
                                  
                        </div> 
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
        imgURL: state.profile.imgURL,
        active: state.friends.active,
        inactive: state.friends.inactive,
        users: state.friends.users
    }
};

// Map all methods to props using redux
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        loadProfilePic: (uid) => {dispatch(loadProfilePic(uid));},
        changeProfilePic: (uid, imgFile) => {dispatch(changeProfilePic(uid, imgFile));},
        findUsers: (name, uid) => {dispatch(findUsers(name, uid));},
        clearUsers: () => {dispatch(clearUsers());}
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));