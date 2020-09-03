import React, { Component } from 'react';
import * as msgActions from '../../store/actions/messagesActions';
import axios from 'axios';
import './MessageCard.css';
import {withRouter} from 'react-router-dom';

class MessageCard extends Component {
    constructor(){
        super();
        this.state = {
            isRead: true,
            memberNames: 'Loading Users...',
            imgURL: [],
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(){
        const {chatId} = this.props;
        this.props.history.push(`/chat/${chatId}`);
    }

    async componentDidMount(){
        const {uid, chatId, lastMsg, isActive, dispatch} = this.props;
        const {readChat} = msgActions;

        let response = await axios.post('http://localhost:5000/chats/members', {uid, chatId});
        const {memberNames} = response.data;

        response = await axios.post('http://localhost:5000/chats/memberids', {uid, chatId});
        const {members} = response.data;

        const size = Math.min(members.length, 2);
        const chatPics = [];

        // //get the chat picture
        for(let i=0;i<size;i++){
            response = await fetch(`http://localhost:5000/users/profilepic/${members[i]}`, {
                method: 'GET'
            }); 

            let file = await response.blob();

            chatPics.push(URL.createObjectURL(file));
        }

        const isRead = await dispatch(readChat(chatId, uid, lastMsg, isActive));
      
        this.setState({
            memberNames,
            imgURL: chatPics,
            isRead
        });   
    }

    async componentDidUpdate(prevProps){
        const {chatId, uid, lastMsg, isActive, dispatch} = this.props;
        const {readChat} =msgActions;

        if(prevProps.isActive !== isActive){
            const isRead = await dispatch(readChat(chatId, uid, lastMsg, isActive));
            this.setState({isRead});
        }
    }

    render() {
        const {memberNames, imgURL, isRead} = this.state;
        
        const {isActive, lastMsg} = this.props;

        const cardClassName = (isActive)? 'active': ''

        const chatPics = []
        for(let i=0; i<imgURL.length;i++){
            chatPics.push(<img key={i} src={imgURL[i]} alt="profile pic" style={{marginLeft: `-${i * 15}px`}}/>)
        }

        return (
            <div onClick={this.handleClick} className={`MessageCard ${cardClassName} card flex-row flex-wrap`}>
                <div class="card-header border-0">

                {chatPics}

                </div>
                <div className="card-block px-2">
                    <h3 className="card-title">{memberNames}</h3>

                    {isActive || isRead?
                        (<p className="card-text text-muted">
                            {lastMsg.content}
                        </p>):
                        (<p className="card-text">
                            <strong>{lastMsg.content}</strong>
                        </p>)
                    }
                </div>
            </div>
        )
    }
}
export default withRouter(MessageCard);