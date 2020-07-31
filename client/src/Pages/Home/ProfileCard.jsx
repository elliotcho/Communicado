import React, { Component } from 'react'
import './ProfileCard.css'
import avatar from './obama.jpg';

class ProfileCard extends Component {
    render() {
        return(
            <div className ='profile-card'>
                <div class="card m-b-30"></div>
                    {/*
                    <div class="card-header bg-white">
                        <h5 class="card-title text-black mb-0">Social Profile</h5>
                    </div>
                    */}
                    <div class="card-body">
                        
                            
                            <div class="row">
                                <div class="col-3">
                                    
                                        <i class="mdi mdi-star font-24"></i>
                                    
                                </div>
                                <div class="col-6">
                                    <img src={avatar} alt="user-profile" className="rounded-circle"></img>
                                    <span class="activeIcon"></span>
                                </div>
                                <div class="col-3">
                                    
                                        <i class="mdi mdi-dots-horizontal font-24"></i>
                                    
                                </div>
                            
                        </div>
                        
                            <div class="row">
                                <div class="col-12">
                                    <div class="xp-social-profile-title">
                                        <h4 class="my-1 text-black">Bay Area, San Francisco, CA</h4>
                                    </div>
                                    <div class="xp-social-profile-subtitle">
                                        <h3 class="mb-3 text-muted">Barack Obama</h3>
                                    </div>
                                    <div class="xp-social-profile-desc">
                                        <p class="text-muted">44th President of the United States</p>
                                    </div>
                                </div>
                            </div>
                        
                        
                            <div class="row">
                                <div class="col-4">
                                    <div class="xp-social-profile-media pt-3">
                                        <h5 class="text-black my-1">45</h5>
                                        <p class="mb-0 text-muted">Messages</p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="xp-social-profile-followers pt-3">
                                        <h5 class="text-black my-1">278</h5>
                                        <p class="mb-0 text-muted">Friends</p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="xp-social-profile-following pt-3">
                                        <h5 class="text-black my-1">552</h5>
                                        <p class="mb-0 text-muted">Days Joined</p>
                                    </div>
                                </div>
                            </div>


                            
                        
                        
                    </div>       
                </div>
        )
    }
}

export default ProfileCard