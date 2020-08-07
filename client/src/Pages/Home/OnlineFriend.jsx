import React, { Component } from 'react'
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

        const config = {'content-type': 'application/json'};
        const data = {action: 'load', uid: _id};

        // Fetch profile picture for friend
        const response = await fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        const file = await response.blob()

        // Set state of imgURL to display senders IMG
        this.setState({imgURL: URL.createObjectURL(file)});
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
                <div class="row sideBar-body">
                    
                    <div class="col-sm-3 sideBar-avatar">
                        <div class="avatar-icon">
                            <img src={imgURL? imgURL: loading}></img>
                            <span class={displayColor}></span>
                        </div>
                    </div>
                    <div class="col-sm-9 sideBar-main">
                        
                        <div class="col-sm-8 sideBar-name">
                            
                            <span class="name-meta">{firstName} {lastName}</span>
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