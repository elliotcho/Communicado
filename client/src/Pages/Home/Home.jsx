import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo, loadProfilePic, changeProfilePic} from '../../store/actions/profileActions';
import Navbar from '../../Partials/Navbar'
import './Home.css';

import loading from './loading.jpg';

class Home extends Component{
    constructor(){
        super();
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        const {uid} = this.props;

        this.props.getUserInfo(uid);

        this.props.loadProfilePic(uid);
    }

    handleChange(e){
        this.props.changeProfilePic(this.props.uid, e.target.files[0]);
    }

    render(){
        const {imgURL, firstName, lastName} = this.props;

        if(!this.props.uid){
            return <Redirect to='/'/>
        }

        return(
            <div className='home'>
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        
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
                    </div>
                </div>

                <footer>
    
                </footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        imgURL: state.profile.imgURL
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        loadProfilePic: (uid) => {dispatch(loadProfilePic(uid));},
        changeProfilePic: (uid, imgFile) => {dispatch(changeProfilePic(uid, imgFile));}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);