import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as msgActions from '../../store/actions/messagesActions';
import {loadProfilePic} from '../../store/actions/profileActions';
import MessageBubble from './MessageBubble';
import TypingBubble from './TypingBubble';
import loading from '../../images/loading.jpg';
import {io} from '../../App';
import './ExpandChat.css';

class ExpandChat extends Component{
    constructor(){
        super();

        this.state = {
            memberNames: 'Loading Users...',
            chatPics: []
        }

        this.onConvoUpdate = this.onConvoUpdate.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.sendReadReceipt = this.sendReadReceipt.bind(this);
    }

    async componentDidMount(){
        await this.onConvoUpdate();
    }

    async componentDidUpdate(prevProps){
        const {chatId} = this.props;

        if(chatId !== prevProps.chatId && chatId !== "new"){
            await this.onConvoUpdate();
        }
    }

    async onConvoUpdate(){
        const {chatId, uid, dispatch} = this.props;

        const{
            getChatPics,
            getMemberNames,
            setChatIdOnDisplay,
            setMsgsOnDisplay
        } = msgActions;

        dispatch(setChatIdOnDisplay(chatId));
        dispatch(setMsgsOnDisplay(chatId, uid));
        await this.sendReadReceipt();

        const chatPics = await getChatPics(chatId, uid, loadProfilePic);
        const memberNames = await getMemberNames(chatId, uid);

        this.setState({
            chatPics,
            memberNames
        });
    }

    async sendReadReceipt(){
        const {chatId, uid} = this.props;
        const {getMemberIds} = msgActions;

        const members = await getMemberIds(chatId, uid);

        io.emit('READ_RECEIPTS', {
            chatId, 
            members,
            uid
        });
    }

    handleScroll(){
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    render(){
        const {uid, typingOnDisplay} = this.props;
        const {memberNames, chatPics} = this.state;

        const messages = this.props.msgsOnDisplay.map(msg =>
            <MessageBubble
                key = {msg._id}
                uid = {uid}
                senderId = {msg.senderId}
                content = {msg.content}
                readBy = {[...msg.readBy]}
                handleScroll = {this.handleScroll}
            />
        );

        return(
            <div className ='expandChat'>
               <header>
                    <div className='profile'>
                        {chatPics.map((pic, i) =>
                            <img 
                                key={i} 
                                src={pic? pic : loading} 
                                alt="profile pic" 
                                className = "profilePic"
                            />
                        )}
                        
                        <h2>
                            {memberNames}
                        </h2>
                    </div>
               </header>

                <section className = 'chat-box' ref = {ele => this.chatBox = ele}>
                    {messages}
                    {typingOnDisplay.map(id =>
                        <TypingBubble
                            key = {id}
                            uid = {id}
                            show = {id !== uid}
                            handleScroll = {this.handleScroll}
                        />
                    )}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        msgsOnDisplay: state.messages.msgsOnDisplay,
        typingOnDisplay: state.messages.typingOnDisplay
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(ExpandChat);