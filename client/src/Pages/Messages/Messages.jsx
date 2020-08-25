import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    updateRecipients,
    clearComposer
} from '../../store/actions/messagesActions';

import MessageList from './MessageList'
import SearchMsgs from './SearchMsgs';
import ExpandChat from './ExpandChat';
import SendMsg from './SendMsg'
import ComposeMsg from './ComposeMsg';

import './Messages.css';

class Messages extends Component {
    constructor(){
        super();
        this.handleComposer = this.handleComposer.bind(this);
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
            clearComposer
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
                            <MessageList/>
                        </div>

                        <div className="expandChat-container col-8">
                            
                            {chatId === 'new'? 
                                (<ComposeMsg 
                                    uid={uid}
                                    queryResults = {queryResults}
                                    updateRecipients = {updateRecipients}
                                    recipients = {recipients}
                                    clearComposer = {clearComposer}
                                />)
                                : <ExpandChat/>
                            }
                            
                            <SendMsg chatid={chatId}/>
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
        recipients: state.messages.recipients
    }   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateRecipients: (recipients) => {dispatch(updateRecipients(recipients));},
        clearComposer: () => {dispatch(clearComposer());}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));