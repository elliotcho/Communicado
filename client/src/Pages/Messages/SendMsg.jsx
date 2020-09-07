import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as msgActions from '../../store/actions/messagesActions';
import {io} from '../../App';
import './SendMsg.css';

let timeOuts = []

class SendMsg extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewChat = this.handleNewChat.bind(this);
        this.handleExistingChat = this.handleExistingChat.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
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

        const {chatId, recipients} = this.props;
        const content = this.msg.value;

        //handles empty input 
        if(content.trim() === ""){
            return;
        }

        if(chatId === 'new'){
            //handles having no recipients
            if(recipients.length === 0){
                return;
            }

            await this.handleNewChat(content);
        }

        else{
             await this.handleExistingChat(content);
        }
        
        //reset textarea value to empty string
        this.msg.value = "";
    }

    async handleNewChat(content){
        const {uid, dispatch, recipients} = this.props;
        const {createChat, loadChats} = msgActions;

        const chatId = await createChat(uid, recipients, content);
        dispatch(loadChats(uid));

        io.emit('CREATE_CHAT', {recipients, uid});

        this.props.history.push(`/chat/${chatId}`);
    }

    async handleExistingChat(content){
        const {chatId, uid, dispatch} = this.props;

        const {
            sendMessage, 
            loadChats,
            getMemberIds
        } = msgActions;


        const newMessage = await sendMessage(chatId, uid, content);
        const members = await getMemberIds(chatId, uid);

        io.emit('NEW_MESSAGE', {
            newMessage, 
            members: [...members, uid], 
            chatId
        });

        dispatch(loadChats(uid));
    }

    async handleTyping(e){
        //let typing= true;
        const text = e.target.value;
        const {uid, chatId, typingOnDisplay} = this.props;
        
        if(text.trim()===""){
            const members = await msgActions.getMemberIds(chatId, uid);
            
            io.emit("STOP_TYPING", {
                uid, 
                chatId, 
                members: [...members, uid]
            });
        }
        
        timeOuts.forEach(t => clearTimeout(t));
        timeOuts = []

        const tO = setTimeout(async () => {
            clearTimeout(tO)

            const members = await msgActions.getMemberIds(chatId, uid);

            io.emit("STOP_TYPING", {
                chatId, 
                uid, 
                members: [...members, uid]
            });
        }, 5000)

        timeOuts.push(tO)
        
        if(!typingOnDisplay.includes(uid)){       
            const members = await msgActions.getMemberIds(chatId, uid);

            io.emit("IS_TYPING", {
                chatId,
                uid, 
                members: [...members, uid]
            });
        }       
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
                        onChange = {this.handleTyping}
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