import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo, loadProfilePic, changeProfilePic} from '../../store/actions/profileActions';
import './Home.css';
import OnlineFriend from './OnlineFriend'
import ProfileCard from './ProfileCard'
import SearchProfileCard from './SearchProfileCard'
import loading from './loading.jpg';

class Home extends Component{
    constructor(){
        super();
        this.handleChange=this.handleChange.bind(this);
    }

    // After init render, read userID and get info + picture to display
    componentDidMount(){
        const {uid} = this.props;
        this.props.getUserInfo(uid);
        this.props.loadProfilePic(uid);
    }

    // Change profile picture
    handleChange(e){
        this.props.changeProfilePic(this.props.uid, e.target.files[0]);
    }

    render(){
        // Destructure props that were mapped to Home
        const {imgURL, firstName, lastName} = this.props;

        if(!this.props.uid){
            return <Redirect to='/'/>
        }

        return(
            <div className='home'>
                <div className="container-fluid">
                    <div class="row">
                        <div class="col"></div>
                        <div class="col-lg-3">
                            <div class="panel panel-default text-center">
                                <div class="panel-heading">
                                <h1 >Search For Friends</h1>
                                </div>
                                <div class="panel-body">
                                    <input id="searchResult" type="text" class="form-control" placeholder="Search Names"></input>
                                
                                    
                                
                                </div>
                                <div class="panel-footer">
                                    <SearchProfileCard />
                                    <SearchProfileCard />
                    
                                </div>
                            </div>      
                        </div>     
                        <div class="col-lg-4">
                            <div class="panel panel-default text-center">
                                <div class="panel-heading">
                                    <h1>My Profile</h1>
                                </div>
                                <div class="panel-body">

                                    <ProfileCard />
                                

                                </div>
                                <div class="panel-footer">
                                
                                    <button class="btn blueButton btn-lg">Account Settings</button>
                                    <button class="btn whiteButton btn-lg">Edit Profile</button>
                                </div>
                            </div>      
                        </div>       
                        <div class="col-lg-3">
                            <div class="panel panel-default text-center">
                                <div class="panel-heading">
                                    <h1>Online Friends</h1>
                                </div>
                                    <div class="panel-body">
                                        <OnlineFriend />
                                        <OnlineFriend />
                                        <OnlineFriend />

                                </div>
                                <div class="panel-heading">
                                    <h1>Offline Friends</h1>
                                </div>
                                    <div class="panel-body">
                                        <OnlineFriend />
                                        <OnlineFriend />
                                        <OnlineFriend />
                                        <OnlineFriend />
                                        <OnlineFriend />
                                        
                                    </div>
                                </div>
                                  
                        </div> 
                        <div class="col"></div>   


                        {/*
                        <div className="col-sm-12 col-md-7">
                            <section className='message'>
                                <h3>Gugsa Challa</h3>
                                <p className='text-muted date'>5 minutes ago</p>
                                <p className='content'>This guy is comedy!!!</p>
                            </section>
                        </div>

                        <div className="col-sm-12 col-md-5 col-xl-4">
                            <div className='profileCard'>
                                <h2>{firstName} {lastName}</h2>
                                <img className="profilePic" src={imgURL ? imgURL: loading} alt="profile pic"></img>
                                <input id='upload' type='file' accept='jpg jpeg png' style={{visibility: 'hidden'}} onChange={this.handleChange}/>
                                <label htmlFor='upload' className='btn-lg btn-primary ml-3'>Change Profile Pic</label>
                            </div>
                        </div>
                        */}
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
        imgURL: state.profile.imgURL
    }
};

// Map all methods to props using redux
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        loadProfilePic: (uid) => {dispatch(loadProfilePic(uid));},
        changeProfilePic: (uid, imgFile) => {dispatch(changeProfilePic(uid, imgFile));}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);