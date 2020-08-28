import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    updateRecipients,
    clearComposer,
    loadChats
} from '../../store/actions/messagesActions';

import MessageList from './MessageList'
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
        const {uid} = this.props;

        const response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        if(chats.length !== 0 && chatId !== 'new'){
            this.props.history.push(`/chat/${chats[0]._id}`);
        }

        else{
            this.props.history.push('/chat/new');
        }
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
            updateRecipients,
            recipients,
            chats,
            typingOnDisplay,
            clearComposer,
            loadChats,
        } = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const chatId = this.props.match.params.id;

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

                            <SearchMsgs/>

                            <MessageList 
                                uid = {uid} 
                                chats = {chats}
                                chatId = {chatId}
                                loadChats = {loadChats}
                                chatId = {chatId}
                            />
                        </div>

                        <div className="expandChat-container col-8">
                            
                            {chatId === 'new'? 
                                (<ComposeMsg 
                                    uid={uid}
                                    queryResults = {queryResults}
                                    recipients = {recipients}
                                    updateRecipients = {updateRecipients}
                                    clearComposer = {clearComposer}
                                />)
                                : <ExpandChat chatId = {chatId}/>
                            }
                            
                            <SendMsg 
                                uid = {uid}
                                chatId = {chatId}
                                recipients = {recipients}
                                typingOnDisplay = {typingOnDisplay}
                                loadChats = {loadChats}
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
        typingOnDisplay: state.messages.typingOnDisplay
    }   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateRecipients: (recipients) => {dispatch(updateRecipients(recipients));},
        clearComposer: () => {dispatch(clearComposer());},
        loadChats: (uid) => {dispatch(loadChats(uid));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));