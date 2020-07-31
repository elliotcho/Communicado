import React, { Component } from 'react'
import './OnlineFriend.css'
import avatar from './avatar6.png';

class OnlineFriend extends Component {
    render() {
        return (

            <div class="online-friend row sideBar-body">
                
                <div class="col-sm-3 sideBar-avatar">
                    <div class="avatar-icon">
                        <img src={avatar}></img>
                    </div>
                </div>
                <div class="col-sm-9 sideBar-main">
                    <div class="row">
                        <div class="col-sm-8 sideBar-name">
                            <span class="name-meta">John Doe
                            </span>
                        </div>
                        <div class="col-sm-4 pull-right sideBar-time">
                            <span class="time-meta pull-right">Last Chatted 18:18
                            </span>
                        </div>  
                    </div>
                </div>
                
            </div>
        )
    }
}
export default OnlineFriend