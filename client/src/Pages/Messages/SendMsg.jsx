import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {io} from '../../App';
import './SendMsg.css';

class SendMsg extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    pressEnter(e){
        //user doesn't press shift enter
        if(e.keyCode === 13  && e.shiftKey === false){
            e.preventDefault(); // prevent automatic new line on just pressing enter
            this.msgForm.dispatchEvent(new Event('submit'));
        }

        //user presses shift enter or another key that is not just enter
        else{
            setTimeout(() =>{
                this.msg.style.height = "";
                this.msg.style.height = this.msg.scrollHeight + 'px';
            }, 0);
        }

        if(this.msg.scrollHeight > 200){
            this.msg.style.overflow = 'auto';
        }

        else{
            this.msg.style.overflow = 'hidden';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const {chatId, recipients, uid} = this.props;

        const content = this.msg.value;

        //handles empty input 
        if(content.trim() === ""){return;}

        if(chatId === 'new'){
            //handles having no recipients
            if(recipients.length === 0){
                return;
            }

            const response = await axios.post('http://localhost:5000/chats/create', {recipients, uid, content});
            const {chatId} = response.data;

            this.props.loadChats(uid);

            io.emit('CREATE_CHAT', {recipients, uid});

            this.props.history.push(`/chat/${chatId}`);
        }

        else{
            const response = await axios.post('http://localhost:5000/chats/send',{recipients, uid, content,chatId});
            //const messages = response.data;    
            //this.props.loadChats(uid);
        }
        
        //reset textarea value to empty string
        this.msg.value = "";
    }

    render(){
        return(
            <div className= "send-msg">
                <form ref = {ele => this.msgForm = ele } onSubmit= {this.handleSubmit}>
                    <textarea
                        className =' form-control'
                        rows = '1'
                        placeholder = 'Type a message...'
                        ref = {ele => this.msg = ele}
                        onKeyDown = {this.pressEnter} 

                    />

                    <label>
                        <i className = 'fas fa-file-image'/>
                    </label>
                </form>
            </div>
        )
    }
}

export default withRouter(SendMsg);