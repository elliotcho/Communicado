import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    updateRecipients
} from '../../store/actions/messagesActions';

import MessageList from './MessageList'
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
            recipients
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
                                <h3>Messages</h3>
                                
                                
                                {chatId === 'new'?
                                    (<i className='fa fa-times' onClick={this.handleComposer}/>):
                                    (<i className="fa fa-paper-plane-o" onClick={this.handleComposer}/>)
                                }               
                            </header>

                            <MessageList/>
                        </div>

                        <div className="expandChat-container col-8">
                            
                            {chatId === 'new'? 
                                (<ComposeMsg 
                                    uid={uid}
                                    queryResults = {queryResults}
                                    updateRecipients = {updateRecipients}
                                    recipients = {recipients}
                                />)
                                : <ExpandChat/>
                            }
                            
                            <SendMsg/>
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
        updateRecipients: (recipients) => {dispatch(updateRecipients(recipients));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));