import React, {Component} from 'react';
import {getReadReceipts} from '../../store/actions/messagesActions';
import {loadProfilePic} from '../../store/actions/profileActions';
import loading from '../../images/loading.jpg';
import './MessageBubble.css';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state={
            senderImgURL: null,
            readReceipts: []
        }

        this.loadReadReceipts = this.loadReadReceipts.bind(this);
    }

    async componentDidMount(){
        const {senderId} = this.props;

        const senderImgURL = await loadProfilePic(senderId);
        await this.loadReadReceipts();
   
        this.setState({senderImgURL});
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
        const {uid, senderId, content} = this.props;
        const {senderImgURL, readReceipts} = this.state;

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