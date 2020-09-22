import React, {Component} from 'react';
import {getReadReceipts, getMessageImage} from '../../store/actions/messagesActions';
import {loadProfilePic} from '../../store/actions/profileActions';
import loading from '../../images/loading.jpg';
import './MessageBubble.css';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state={
            senderImgURL: null,
            contentImg: null,
            readReceipts: []
        }

        this.loadReadReceipts = this.loadReadReceipts.bind(this);
    }

    async componentDidMount(){
        const {chatId, msgId, senderId, handleScroll, image} = this.props;

        if(image){
            const contentImg = await getMessageImage(chatId, msgId);
            this.setState({contentImg});
        }

        const senderImgURL = await loadProfilePic(senderId);
        await this.loadReadReceipts();
   
        this.setState({senderImgURL});
        handleScroll();
    }

    async componentDidUpdate(prevProps){
        const {readBy} = this.props;

        if(prevProps.readBy.length !== readBy.length){
            await this.loadReadReceipts();
        }
    }

    async loadReadReceipts(){
        const {readBy, senderId} = this.props;
        
        const readReceipts = await getReadReceipts(readBy, senderId, loadProfilePic);

        this.setState({readReceipts});
    }

    render(){
        const {uid, senderId, content, image} = this.props;
        const {senderImgURL, contentImg, readReceipts} = this.state;

        const msgPosition = (uid === senderId)? 
            'msg-r': 
            'msg-l';

        return(
            <div className ='row no-gutters'>
                <div className='msg-container'>
                    {msgPosition === 'msg-l'? 
                        <img src = {senderImgURL? senderImgURL: loading} alt ='profile pic'/>: 
                        null
                    }

                    <div className ={`msg ${msgPosition} my-1`}>
                        <div>
                            {image? <img src={contentImg? contentImg: loading} alt='content pic'/>: null}
                            {content}
                        </div>

                        <div className = 'read-receipts'>
                            {readReceipts.map((imgURL, i) => 
                                <img
                                    key = {i}
                                    src = {imgURL}
                                    alt = 'profile pic'
                                />
                            )}
                        </div>
                    </div>
                  
                    {msgPosition === 'msg-r'? 
                        <img src = {senderImgURL? senderImgURL: loading} alt ='profile pic'/>:
                        null
                    }
                </div>
            </div>
        )
    }
}

export default MessageBubble;