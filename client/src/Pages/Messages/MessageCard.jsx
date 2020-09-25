import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import * as msgActions from '../../store/actions/messagesActions';
import {loadProfilePic} from '../../store/actions/profileActions';
import loading from '../../images/loading.jpg';
import './MessageCard.css';

class MessageCard extends Component {
    constructor(){
        super();
        
        this.state = {
            isRead: true,
            memberNames: 'Loading Users...',
            chatPics: [],
        }

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(){
        const {chatId,uid,dispatch,clearTextbox} = this.props;
        const {loadChats} = msgActions;
        this.props.history.push(`/chat/${chatId}`);
        dispatch(loadChats(uid));
        clearTextbox();
    }

    async componentDidMount(){
        const {chatId, uid, lastMsg, isActive, dispatch} = this.props;
        const {readChat, getChatPics, getMemberNames} = msgActions;

        const isRead = dispatch(readChat(chatId, uid, lastMsg, isActive));
        const chatPics = await getChatPics(chatId, uid, loadProfilePic);
        const memberNames = await getMemberNames(chatId, uid);
    
        this.setState({
            memberNames,
            chatPics,
            isRead
        });   
    }

    async componentDidUpdate(prevProps){
        const {chatId, uid, lastMsg, isActive, dispatch} = this.props;
        const {readChat} =msgActions;

        if(prevProps.isActive !== isActive){
            const isRead = await dispatch(readChat(chatId, uid, lastMsg, isActive));
            
            this.setState({
                isRead
            });
        }
    }

    render() {
        const {memberNames, chatPics, isRead} = this.state;
        const {isActive, lastMsg} = this.props;

        const cardClassName = (isActive)? 'active': ''

        return (
            <div onClick={this.handleClick} className={`MessageCard ${cardClassName} card flex-row flex-wrap`}>
                <div className = "card-header border-0">
                    {chatPics.map((pic, i) =>
                        <img
                            key = {i}
                            src = {pic? pic: loading}
                            alt = 'proflie pic'
                            style={{marginLeft: `-${i * 15}px`}}
                        />
                    )}
                </div>

                <div className="card-block px-2">
                    <h3 className="card-title">
                        {memberNames}
                    </h3>

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