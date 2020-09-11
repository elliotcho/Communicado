import React,{Component} from 'react';
import * as msgActions from '../../store/actions/messagesActions';
import ExpandChat from './ExpandChat';
import UserComposedTo from './UserComposedTo';
import {io} from '../../App';
import "./ComposeMsg.css";

class ComposeMsg extends Component{
    constructor(){
        super();

        this.state = {
            composedTo: ''
        }

        this.handleChange= this.handleChange.bind(this);
        this.addRecipient = this.addRecipient.bind(this);
        this.deleteRecipient = this.deleteRecipient.bind(this);
    }

    handleChange(e){
        const {uid, recipients} = this.props;

        io.emit('GET_RECIPIENTS', {
            uid,
            recipients, 
            name: e.target.value
        });

        this.setState({composedTo: e.target.value});
    }

    async addRecipient(user){
        const {uid, recipients, dispatch} = this.props;

        const {
            updateRecipients, 
            checkIfChatExists, 
            renderComposerChat
        } = msgActions;

        const chatId = (recipients.length === 0) ?
                        await checkIfChatExists(uid, user._id):
                        null;

        if(chatId){
            dispatch(renderComposerChat(chatId));
        }

        dispatch(updateRecipients([...recipients, user]));

        io.emit('GET_RECIPIENTS', {
            uid,
            recipients: [],
            name: ''
        });

        this.setState({composedTo: ''});
    }

    deleteRecipient(e){
        const {recipients, dispatch} = this.props;
        const {updateRecipients, clearComposerChat} = msgActions;
        const {composedTo} = this.state;

        if(e.keyCode === 8 && composedTo === '' && recipients.length > 0){
            recipients.pop();

            if(recipients.length !== 1){
                dispatch(clearComposerChat());
            }

            dispatch(updateRecipients(recipients));
        }
    }

    componentWillUnmount(){
        const {dispatch} = this.props;
        const {clearComposer} = msgActions;

        dispatch(clearComposer());
    }
    
    render(){
        const {queryResults, recipients, composerChatId} = this.props;
        const {composedTo} = this.state;

        return(
            <div className ='composer'>
                <header>
                    <div className='recipients-container'>
                        {recipients.map(user =>
                            <div key={user._id} className='user-block d-inline-block'>
                                {user.firstName} {user.lastName}
                            </div>
                        )}

                        <input 
                            type="text" 
                            placeholder="To..."
                            onChange = {this.handleChange}
                            value = {composedTo}
                            onKeyDown = {this.deleteRecipient}
                        />
                    </div>
               </header>

               {composerChatId? 
                    <ExpandChat chatId = {composerChatId}/>:
                    null
               }

               {queryResults.map(user =>
                    <UserComposedTo 
                        key={user._id}
                        user = {user}
                        addRecipient = {this.addRecipient}
                    />
               )}
            </div>
        )
    }
}

export default ComposeMsg;