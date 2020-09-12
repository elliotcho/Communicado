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
        this.handleChange = this.handleChange.bind(this);
        this.handleIsTyping = this.handleIsTyping.bind(this);
        this.handleStopTyping = this.handleStopTyping.bind(this);
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

        const {chatId, composerChatId, recipients} = this.props;
        const content = this.msg.value;

        //handles empty input 
        if(content.trim() === ""){
            return;
        }

        if(chatId === 'new' && !composerChatId){
            //handles having no recipients
            if(recipients.length === 0){
                return;
            }

            await this.handleNewChat(content);
        }

        else{
             await this.handleStopTyping();
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
        const {chatId, composerChatId, uid, dispatch} = this.props;

        const {
            sendMessage, 
            loadChats,
            getMemberIds, 
            renderNewMessage
        } = msgActions;

        const currChatId = (composerChatId)? composerChatId: chatId;

        const newMessage = await sendMessage(currChatId, uid, content);
        dispatch(renderNewMessage(newMessage, currChatId, uid));
        dispatch(loadChats(uid));

        const members = await getMemberIds(currChatId, uid);

        io.emit('NEW_MESSAGE', {
            newMessage, 
            members: [...members], 
            chatId: currChatId
        });

        if(currChatId !== chatId){
            this.props.history.push(`/chat/${currChatId}`);
        }
    }

    async handleChange(e){
        if(e.target.value.includes('\n')){
            this.msg.dispatchEvent(new Event('keydown'));
            return;
        }

        if(e.target.value.trim() === ""){
            await this.handleStopTyping();
            return;
        }

        await this.handleIsTyping();
    }

    async handleIsTyping(){
        const {uid, chatId, composerChatId, typingOnDisplay} = this.props;
        const{getMemberIds} = msgActions;
        
        const currChatId = (composerChatId) ? composerChatId: chatId;

        timeOuts.forEach(t => clearTimeout(t));
        timeOuts = []

        const tO = setTimeout(async () => {
            clearTimeout(tO)
            await this.handleStopTyping();
        }, 5000)

        timeOuts.push(tO)
        
        if(!typingOnDisplay.includes(uid)){       
            const members = await getMemberIds(currChatId, uid);

            io.emit("IS_TYPING", {
                chatId: currChatId,
                members: [...members, uid],
                uid
            });
        }       
    }

    async handleStopTyping(){
        const {chatId, composerChatId, uid} = this.props;
        const {getMemberIds} = msgActions;

        const currChatId = (composerChatId) ? composerChatId: chatId;

        const members = await getMemberIds(currChatId, uid);

        io.emit("STOP_TYPING", {
            chatId: currChatId,
            members: [...members, uid] ,
            uid
        });
    }

    async componentWillUnmount(){
        await this.handleStopTyping();
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
                        onChange = {this.handleChange}
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