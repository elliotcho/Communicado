import React,{Component} from 'react';
import {updateRecipients, clearComposer} from '../../store/actions/messagesActions';
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

    addRecipient(user){
        const {uid, recipients, dispatch} = this.props;

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
        const {composedTo} = this.state;

        if(e.keyCode === 8 && composedTo === '' && recipients.length > 0){
            recipients.pop();
            dispatch(updateRecipients(recipients));
        }
    }

    componentWillUnmount(){
        this.props.dispatch(clearComposer());
    }
    
    render(){
        const {queryResults, recipients} = this.props;
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