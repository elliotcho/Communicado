import React, { Component } from 'react'
import './ProfileCard.css'
import avatar from './obama.jpg';

// Component that shows a Users profile card on the home page
class ProfileCard extends Component {
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
                                <img src={avatar} alt="user-profile" className="rounded-circle userIMG" />
                            </div>

                            {/* User Name */}
                            <div className="col-12 mb-4">
                                <h2>Barack Obama</h2>
                            </div>

                            {/* Number of friends */}
                            <div className="col-12 mb-4">
                                <h4 className="text-muted"> ______ friends</h4>
                            </div>

                            {/* Date Joined */}
                            <div className="col-12 mb-3">
                                <h4 className="text-muted">Joined _____ days ago</h4>
                            </div>
                        </div>

                        <br />
                        {/* Button Row */}
                        <div className="row btns">
                            {/* Settings btn */}
                            <div className="col-md-6 col-sm-12 mb-3">
                                <button class="btn whiteButton btn-lg w-100">Settings</button>
                            </div>
                            {/* Profile button */}
                            <div className="col-md-6 col-sm-12">
                                <button class="btn whiteButton btn-lg w-100">Edit Profile</button>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        )
    }
}

export default ProfileCard;