import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {io} from '../../App';
import {getUserInfo, loadProfilePic, changeProfilePic} from '../../store/actions/profileActions';
import {findUsers, clearUsers} from '../../store/actions/friendsActions';
import './Home.css';
import OnlineFriend from './OnlineFriend'
import ProfileCard from './ProfileCard'
import SearchProfileCard from './SearchProfileCard'

class Home extends Component{
    constructor(){
        super();

        this.state = {
            query: ''
        };

        this.searchUsers = this.searchUsers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toSettings = this.toSettings.bind(this);
    }

    // After init render, read userID and get info + picture to display
    componentDidMount(){
        const {uid} = this.props;

        this.props.getUserInfo(uid);

        this.props.loadProfilePic(uid);

        io.emit('GET_ONLINE_FRIENDS', {uid});
    }

    searchUsers(e){
        this.setState({[e.target.id]: e.target.value});
    }

    // Change profile picture
    // handleChange(e){
    //     this.props.changeProfilePic(this.props.uid, e.target.files[0]);
    // }

    toSettings(){
        this.props.history.push('/settings');
    }

    handleSubmit(e){
        e.preventDefault();

        const {uid} = this.props;

        const {query} = this.state;

        if(query.trim() === ''){
            return;
        }

        this.props.findUsers(query, uid);
    }

    componentWillUnmount(){
        this.props.clearUsers();
    }

    render(){
        if(!this.props.uid){
            return <Redirect to='/'/>
        }

        const {active, inactive, users} = this.props;

        const onlineFriends = active.map(user =>
            <OnlineFriend key={user._id} user={user} status={'online'}/>
        );

        const offlineFriends = inactive.map(user =>
            <OnlineFriend key = {user._id} user={user} status={'offline'}/>
        );

        return(
            <div className='home'>
                <div className="container-fluid">
                    <div class="row">
                        <div class="col"></div>
                        <div class="col-lg-3">
                            <div class="card text-center h-100">
                                <div class="card-header">
                                <h1 >Search For Friends</h1>
                                </div>
                                <div class="card-body">
                    
                                    <form onSubmit = {this.handleSubmit}>
                                        <input 
                                            id='query' 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Search Names" 
                                            onChange={this.searchUsers}
                                            value = {this.state.query}
                                        />    
                                    </form>

                                    {users.map(user =>
                                        <SearchProfileCard key={user._id} user={user}/>      
                                    )}               
                                </div>
                                <div class="card-footer fill">
                                    
                    
                                </div>
                            </div>      
                        </div>     
                        <div class="col-lg-4">
                            <div class="card text-center h-100">
                                <div class="card-header">
                                    <h1>My Profile</h1>
                                </div>
                                <div class="card-body">

                                    <ProfileCard />

                                    <br></br>
                                    <button class="btn whiteButton btn-lg" onClick={this.toSettings}>Account Settings</button>
                                    <button class="btn whiteButton btn-lg">Edit Profile</button>
                                </div>
                                <div class="card-footer fill">
                                
                                    
                                </div>
                            </div>      
                        </div>       
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

                <footer>
    
                </footer>
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