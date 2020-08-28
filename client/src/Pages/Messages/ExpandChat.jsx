import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    setMsgsOnDisplay,
    setChatIdOnDisplay
} from '../../store/actions/messagesActions'

import MessageBubble from './MessageBubble';
import TypingBubble from './TypingBubble';
import axios from 'axios';
import './ExpandChat.css';

class ExpandChat extends Component{
    constructor(){
        super();

        this.state = {
            memberNames: 'Loading Users...',
            imgURL: []
        }

        this.getMessages = this.getMessages.bind(this);
        this.getMemberNames = this.getMemberNames.bind(this);
    }

    async componentDidMount(){
        await this.getMessages();
        await this.getMemberNames();
        await this.getChatPic();
    }

    async componentDidUpdate(prevProps){
        const {chatId} = this.props;

        if(chatId !== prevProps.chatId){
            await this.getMessages();
            await this.getMemberNames();
            await this.getChatPic();
        }
    }

    async getChatPic(){
        const {chatId, uid} = this.props;

        let response = await axios.post('http://localhost:5000/chats/memberids', {uid, chatId});
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

        this.setState({
            imgURL: chatPics
        });
    }

    async getMessages(){
        const {chatId} = this.props;

        const response = await axios.get(`http://localhost:5000/chats/messages/${chatId}`);
        const messages = response.data;

        this.props.setMsgsOnDisplay(messages);
        this.props.setChatIdOnDisplay(chatId);
    }

    
    async getMemberNames(){
        const {uid, chatId} = this.props;

        const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId});
        const {memberNames} = response.data;

        this.setState({memberNames});
    }

    render(){
        const {uid, typingOnDisplay} = this.props;
       
        const {memberNames, imgURL} = this.state;

        const messages = this.props.msgsOnDisplay.map(msg =>
            <MessageBubble
                key = {msg._id}
                uid = {uid}
                senderId = {msg.senderId}
                content = {msg.content}
            />
        );

        console.log(typingOnDisplay)

        const typing = typingOnDisplay.map(id =>
            <TypingBubble
                key = {id}
                uid = {id}
            />
        );

        const chatPics = []
        for(let i=0; i<imgURL.length;i++){
            chatPics.push(<img key={i} src={imgURL[i]} alt="profile pic" className = "profilePic"/>)
        }

        return(
            <div className ='expandChat'>
               <header>
                    <div className='profile'>
                        {chatPics.length === 0 ? "//placehold.it/50" : chatPics}
                        <h2>{memberNames}</h2>
                    </div>
               </header>

                <section className = 'chat-box'>
                    {messages}
                    {typing}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        msgsOnDisplay: state.messages.msgsOnDisplay,
        typingOnDisplay: state.messages.typingOnDisplay
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setMsgsOnDisplay: (messages) => {dispatch(setMsgsOnDisplay(messages));},
        setChatIdOnDisplay: (chatId) => {dispatch(setChatIdOnDisplay(chatId));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandChat);