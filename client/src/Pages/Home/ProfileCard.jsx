import React, { Component } from 'react'
import loading from './loading.jpg';
import moment from 'moment';
import { Link } from 'react-router-dom'
import './ProfileCard.css'

// Component that shows a Users profile card on the home page
class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.changeProfilePic = this.changeProfilePic.bind(this);
    }

    // Changes the picture of a user with the input file provided using redux function from props
    changeProfilePic(evt) {
        evt.preventDefault();
        const imgURL = (evt.target.files[0])
        const {changeProfilePic, uid} = this.props;
        changeProfilePic(uid, imgURL);
    }

    render() {
        return (
            <div className="ProfileCard col-lg-4">
                <div className="card text-center d-flex justify-content-center homeCard w-100 h-100">

                    {/* Card Header */}
                    <div className="card-header rounded-0 cardTitle">
                        <h1 className="display-4">My Profile</h1>
                    </div>

                    {/* Card Body */}
                    <div className="card-body">
                        <div className="row">
                            {/* User Img */}
                            <div className="img-fluid col-12 my-4">
                                <img src={this.props.imgURL? this.props.imgURL: loading} alt="user-profile" className="rounded-circle userIMG" />
                            </div>

                            {/* User Name */}
                            <div className="col-12 mb-4">
                                <h2>{this.props.firstName} {this.props.lastName}</h2>
                            </div>

                            {/* Number of friends */}
                            <div className="col-12 mb-4">
                                <h4 className="text-muted"> {this.props.numFriends} friends</h4>
                            </div>

                            {/* Date Joined */}
                            <div className="col-12 mb-3">
                                <h4 className="text-muted">Joined {moment(this.props.created).calendar()}</h4>
                            </div>
                            
                        </div>

                        <br />
                        {/* Button Row */}
                        <div className="row btns d-flex justify-content-center align-items-center">
                            
                            {/* Settings btn */}
                            <div className="col-md-6 col-sm-12 mb-3">
                                <Link to='/settings'>
                                <button class="btn whiteButton btn-lg w-100 h-100">
                                        <label htmlFor="goToSettings" className="settingsLabel">
                                            Settings
                                        </label>
                                </button> 
                                </Link>     
                            </div>
                            
                            {/* Profile button */}
                            <div className="col-md-6 col-sm-12 mb-3">
                                <button class="btn whiteButton btn-lg w-100 h-100">
                                        <label htmlFor="upload" className="inputLabel">
                                            Edit Picture
                                        </label>
                                        <input 
                                            onChange={this.changeProfilePic}
                                            className="fileInput"
                                            id='upload'
                                            type='file'
                                            name='upload'
                                            accept='jpg jpeg png'
                                            style={{display: 'none'}}
                                        />        
                                </button>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        )
    }
}


export default ProfileCard;