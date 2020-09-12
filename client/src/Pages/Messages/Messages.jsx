import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as msgActions from '../../store/actions/messagesActions';
import MessageCard from './MessageCard';
import SearchMsgs from './SearchMsgs';
import ExpandChat from './ExpandChat';
import SendMsg from './SendMsg'
import ComposeMsg from './ComposeMsg';
import axios from 'axios';
import './Messages.css';

class Messages extends Component {
    constructor(){
        super();
        this.handleComposer = this.handleComposer.bind(this);
    }

    async componentDidMount(){
        const chatId = this.props.match.params.id;

        const {uid, dispatch} = this.props;
        const {loadChats, seeChats} = msgActions;

        this.cancelSource = axios.CancelToken.source();
        
        const chats = await dispatch(loadChats(uid, this.cancelSource));
        dispatch(seeChats(uid));

        if(chats.length !== 0 && chatId !== 'new'){
            this.props.history.push(`/chat/${chats[0]._id}`);
        }

        else{
            this.props.history.push('/chat/new');
        }
    }

    componentDidUpdate(){
        const {uid, dispatch, unseenChats} = this.props;
        const {seeChats} = msgActions;

        if(unseenChats){
            dispatch(seeChats(uid));
        }
    }

    componentWillUnmount(){
        const {dispatch} = this.props;
        const {clearChats} = msgActions;

        dispatch(clearChats());

        this.cancelSource.cancel();
    }

    handleComposer(){
        const {id} = this.props.match.params;

        if(id === 'new'){
            this.props.history.push('/chat/home');
        }

        else{
            this.props.history.push('/chat/new');
        }
    }

    render() {
        const {
            uid,
            queryResults,        
            recipients,
            chats,
            typingOnDisplay,
            composerChatId,
            dispatch
        } = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const chatId = this.props.match.params.id;

        const msgCards =chats.map(chat =>
            <MessageCard
                key = {chat._id}
                chatId = {chat._id}
                uid = {uid}
                isActive = {chatId === chat._id}
                lastMsg = {chat.messages[chat.messages.length -1]}
                dispatch = {dispatch}
            />
        );

        return (
            <div className="Messages">
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <header className='compose'> 
                                <h3>Chats</h3>
                                
                                {chatId === 'new'?
                                    (<i className='fa fa-times' onClick={this.handleComposer}/>):
                                    (<i className="fas fa-paper-plane" onClick={this.handleComposer}/>)
                                }               
                            </header>

                            <div className ='MessageList'>
                                <SearchMsgs/>
                                {msgCards} 
                            </div>
                        </div>

                        <div className="expandChat-container col-8">
                            {chatId === 'new'? 
                                (<ComposeMsg 
                                    uid={uid}
                                    queryResults = {queryResults}
                                    recipients = {recipients}
                                    composerChatId = {composerChatId}
                                    dispatch = {dispatch}
                                />): 
                                (<ExpandChat 
                                    chatId={chatId} 
                                    isComposerChat={false}
                                />)
                            }
                            
                            <SendMsg 
                                uid = {uid}
                                chatId = {chatId}
                                recipients = {recipients}
                                typingOnDisplay = {typingOnDisplay}
                                composerChatId = {composerChatId}
                                dispatch ={dispatch}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        queryResults: state.messages.queryResults,
        recipients: state.messages.recipients,
        chats: state.messages.chats,
        typingOnDisplay: state.messages.typingOnDisplay,
        unseenChats: state.messages.unseenChats,
        composerChatId: state.messages.composerChatId
    }   
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));