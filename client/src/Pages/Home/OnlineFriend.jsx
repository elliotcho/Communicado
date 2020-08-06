import React, { Component } from 'react'
import './OnlineFriend.css'
import avatar from './avatar6.png';

class OnlineFriend extends Component {
    render() {
        return (
            <div className = "onlineFriend">
                <div class="row sideBar-body">
                    
                    <div class="col-sm-3 sideBar-avatar">
                        <div class="avatar-icon">
                            <img src={avatar}></img>
                            <span class="activeIconOn"></span>
                        </div>
                    </div>
                    <div class="col-sm-9 sideBar-main">
                        
                        <div class="col-sm-8 sideBar-name">
                            
                            <span class="name-meta">John Doe</span>
                        </div>
                        <div class="col-sm-4 float-right sideBar-time">
                            <br></br>
                            <span class="time-meta float-right">Last Chatted 18:18</span>
                        </div>  
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default OnlineFriend