import React, { Component } from 'react';
import {loadProfilePic} from '../../store/actions/profileActions';
import {checkIfChatExists, getChat} from '../../store/actions/messagesActions';
import loading from '../../images/loading.jpg';
import moment from 'moment';
import './OnlineFriend.css';

class OnlineFriend extends Component {
    constructor(){
        super();

        this.state = { 
            imgURL: null, 
            timeOfLastMessage: null
        };
    }

    // After init render, load users data
    async componentDidMount() {
        const {uid} = this.props;
        const {_id} = this.props.user;

        let timeOfLastMessage = null;

        const imgURL = await loadProfilePic(_id);
        const chatId = await checkIfChatExists(uid, _id);

        if(chatId){
            const chat = await getChat(chatId);
            timeOfLastMessage = chat.timeOfLastMessage;
        }

        this.setState({
            imgURL, 
            timeOfLastMessage
        });
    }

    render() {
        // Destructuring
        const {imgURL, timeOfLastMessage} = this.state;
        const {firstName, lastName} = this.props.user;
    
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
                            {timeOfLastMessage? 
                                (<span className ="time-meta float-right">
                                    Last Chatted: {moment(timeOfLastMessage).calendar()}
                                </span>):
                                null
                            }
                        </div>       
                    </div>
                </div>
            </div>
        )
    }
}

export default OnlineFriend