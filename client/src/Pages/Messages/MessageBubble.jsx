import React, {Component} from 'react';
import loading from '../../images/loading.jpg';
import './MessageBubble.css';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state={
            senderImgURL: null
        }
    }

    async componentDidMount(){
        const {senderId} = this.props;

        let response = await fetch(`http://localhost:5000/users/profilepic/${senderId}`, {method: 'GET'}); 
        const file = await response.blob();
   
        this.setState({senderImgURL: URL.createObjectURL(file)});
    }

    render(){
        const {uid, senderId, content} = this.props;
        const {senderImgURL} = this.state;

        const msgPosition = (uid === senderId)? 'msg-r': 'msg-l';

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