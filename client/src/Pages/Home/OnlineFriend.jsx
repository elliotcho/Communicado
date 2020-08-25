import React, { Component } from 'react';
import axios from 'axios';
import './OnlineFriend.css'
import loading from './loading.jpg';

class OnlineFriend extends Component {
    constructor(props){
        super(props);
        this.state ={ imgURL: null };
    }

    // After init render, load users data
    async componentDidMount() {
        const {_id} = this.props.user;

        // Fetch profile picture for friend
        // Fetch from server functional route using get
        const response = await fetch(`http://localhost:5000/users/profilepic/${_id}`, {method: 'GET'}); 
        let file = await response.blob();
        
        this.setState({
            imgURL: URL.createObjectURL(file)
        });

    }

    render() {
        // Destructuring
        const {firstName, lastName} = this.props.user;
        const {imgURL} = this.state;
        const {status} = this.props;

        let displayColor;

        // Online icon
        if(status === 'online') {
            displayColor = 'activeIconOn';
        }
        // Offline icon
        else {
            displayColor = 'activeIconOff';
        }

        return (
            <div className = "onlineFriend">
                <div className ="row sideBar-body">
                    
                    <div className ="col-sm-3 sideBar-avatar">
                        <div className ="avatar-icon">
                            <img src={imgURL? imgURL: loading}></img>
                            <span className = {displayColor}></span>
                        </div>
                    </div>
                    <div className ="col-sm-9 sideBar-main">
                        
                        <div className ="col-sm-8 sideBar-name">
                            
                            <span className ="name-meta">{firstName} {lastName}</span>
                        </div>
                        <div className ="col-sm-4 float-right sideBar-time">
                            <br></br>
                            <span className ="time-meta float-right">Last Chatted 18:18</span>
                        </div>  
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default OnlineFriend