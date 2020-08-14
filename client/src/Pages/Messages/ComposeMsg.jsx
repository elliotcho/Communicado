import React,{Component} from 'react';
import {io} from '../../App';
import UserComposedTo from './UserComposedTo';
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
        const {uid} = this.props;

        io.emit('GET_RECIPIENTS', {
            uid, name: e.target.value
        });

        this.setState({composedTo: e.target.value});
    }

    addRecipient(user){
        const {uid, recipients, updateRecipients} = this.props;

        this.setState({composedTo: ''});

        io.emit('GET_RECIPIENTS', {
            uid, name: ''
        });

        updateRecipients([...recipients, user]);
    }

    deleteRecipient(e){
        const {recipients, updateRecipients} = this.props;

        const {composedTo} = this.state;

        if(e.keyCode === 8 && composedTo === '' && recipients.length > 0){
            recipients.pop();
            updateRecipients(recipients);
        }
    }

    componentWillUnmount(){
        this.props.clearComposer();
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