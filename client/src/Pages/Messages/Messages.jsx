import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    loadChats,
    seeChats
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
        const {uid, seeChats} = this.props;

        this.cancelSource = axios.CancelToken.source();
        
        try{
            const response = await axios.get(`http://localhost:5000/chats/user/${uid}`, {
                cancelToken: this.cancelSource.token
            });
            
            const chats = response.data;
            seeChats(uid);

            if(chats.length !== 0 && chatId !== 'new'){
                this.props.history.push(`/chat/${chats[0]._id}`);
            }

            else{
                this.props.history.push('/chat/new');
            }
        }

        catch(err){
            console.log(err)

            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            } 
        }
    }

    componentDidUpdate(){
        const {uid, seeChats, unseenChats} = this.props;

        if(unseenChats){
            seeChats(uid);
        }
    }

    componentWillUnmount(){
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
            loadChats,
            dispatch
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
                                dispatch = {dispatch}
                            />
                        </div>

                        <div className="expandChat-container col-8">
                            
                            {chatId === 'new'? 
                                (<ComposeMsg 
                                    uid={uid}
                                    queryResults = {queryResults}
                                    recipients = {recipients}
                                    dispatch = {dispatch}
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
        typingOnDisplay: state.messages.typingOnDisplay,
        unseenChats: state.messages.unseenChats
    }   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loadChats: (uid) => {dispatch(loadChats(uid));},
        seeChats: (uid) => {dispatch(seeChats(uid));},
        dispatch
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));