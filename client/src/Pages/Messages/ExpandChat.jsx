import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    setMsgsOnDisplay
} from '../../store/actions/messagesActions'

import MessageBubble from './MessageBubble';
import avatar from './avatar.jpg';
import axios from 'axios';
import './ExpandChat.css';

class ExpandChat extends Component{
    constructor(){
        super();
        this.getMessages = this.getMessages.bind(this);
    }

    async componentDidMount(){
        await this.getMessages();
    }

    async componentDidUpdate(prevProps){
        const {chatId} = this.props;

        if(chatId !== prevProps.chatId){
            await this.getMessages();
        }
    }

    async getMessages(){
        const {chatId} = this.props;

        const response = await axios.get(`http://localhost:5000/chats/messages/${chatId}`);
        const messages = response.data;

        this.props.setMsgsOnDisplay(messages);
    }

    render(){
        const {uid} = this.props;

        const messages = this.props.msgsOnDisplay.map(msg =>
            <MessageBubble
                key = {msg._id}
                uid = {uid}
                senderId = {msg.senderId}
                content = {msg.content}
            />
        );

        return(
            <div className ='expandChat'>
               <header>
                    <div className='profile'>
                        <img src = {avatar} className= 'profilePic'/>
                        <h2>Gugsa</h2>
                    </div>
               </header>

               {messages}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        msgsOnDisplay: state.messages.msgsOnDisplay
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setMsgsOnDisplay: (messages) => {dispatch(setMsgsOnDisplay(messages));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandChat);