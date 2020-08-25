import React, {Component} from 'react';
import loading from './loading.jpg';
import './MessageBubble.css';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state={
            senderImgURL: null
        }
    }

    componentDidMount(){
        const {senderId} = this.props;
        const data = {action: 'load', uid: senderId};
        const config = {'content-type': 'application/json'};

        // Fetch from server functional route using post with stringified data
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display senders IMG
            this.setState({senderImgURL: URL.createObjectURL(file)});
        });
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