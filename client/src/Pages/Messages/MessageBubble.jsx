import React, {Component} from 'react';
import {loadProfilePic, getUserData} from '../../store/actions/profileActions';
import {getReadReceipts} from '../../store/actions/messagesActions';
import ImageModal from './ImageModal';
import loading from '../../images/loading.jpg';
import './MessageBubble.css';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state={
            senderImgURL: null,
            readReceipts: [],
            name: "Loading User..."
        }

        this.loadReadReceipts = this.loadReadReceipts.bind(this);
        this.getGroupChatNames = this.getGroupChatNames.bind(this);
    }

    async componentDidMount(){
        const {senderId, handleScroll} = this.props;

        const senderImgURL = await loadProfilePic(senderId);
        await this.loadReadReceipts();
        await this.getGroupChatNames();
   
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

    async getGroupChatNames(){
        const{senderId} = this.props;
        const user = await getUserData(senderId);
        const name = user.firstName+" "+ user.lastName;
        this.setState({name});
    }
  
   

    render(){
        const {uid, msgId, senderId, chatId, content, image} = this.props;
        const {senderImgURL, readReceipts, name} = this.state;

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
                <strong className='usersName'>{name}</strong>
                    <br></br>
                    <br></br>
                        <div>
                            {image?
                                (<div className='text-primary msg-photo' data-toggle ='modal' data-target ={`#${msgId}-image`}>
                                    Photo
                                </div>):
                                null
                            }
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

                {image? 
                    (<div className='modal fade' id={`${msgId}-image`} data-backdrop='false'>
                        <ImageModal msgId={msgId} chatId={chatId}/>
                    </div>):
                    null
                }
            </div>
        )
    }
}

export default MessageBubble;