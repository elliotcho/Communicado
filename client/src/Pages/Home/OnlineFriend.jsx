import React, { Component } from 'react';
import {loadProfilePic} from '../../store/actions/profileActions';
import loading from '../../images/loading.jpg';
import './OnlineFriend.css';

class OnlineFriend extends Component {
    constructor(){
        super();

        this.state = { 
            imgURL: null 
        };
    }

    // After init render, load users data
    async componentDidMount() {
        const {_id} = this.props.user;

        const imgURL = await loadProfilePic(_id);
        
        this.setState({imgURL});
    }

    render() {
        // Destructuring
        const {firstName, lastName} = this.props.user;
        const {imgURL} = this.state;

        return (
            <div className = "onlineFriend">
                <div className ="row sideBar-body">
                    <div className ="col-sm-3 sideBar-avatar">
                        <div className ="avatar-icon">
                            <img src={imgURL? imgURL: loading} alt = 'Profile Pic'/>
                            <span className = 'activeIconOn'/>
                        </div>
                    </div>

                    <div className ="col-sm-9 sideBar-main">
                        <div className ="col-sm-8 sideBar-name">
                            <span className ="name-meta">
                                {firstName} {lastName}
                            </span>
                        </div>

                        <div className ="col-sm-4 float-right sideBar-time">
                            <br/>
                            <span className ="time-meta float-right">
                                Last Chatted 18:18
                            </span>
                        </div>       
                    </div>
                </div>
            </div>
        )
    }
}
export default OnlineFriend