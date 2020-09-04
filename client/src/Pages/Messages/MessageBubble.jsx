import React, {Component} from 'react';
import loading from './loading.jpg';
import './MessageBubble.css';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state={
            senderImgURL: null,
            readImgURL: []
        }
    }

    async componentDidMount(){
        const {senderId,uid,readBy} = this.props;
        let imagesArr= [];
        let response = await fetch(`http://localhost:5000/users/profilepic/${senderId}`, {method: 'GET'}); 
        const file = await response.blob();
        this.setState({senderImgURL: URL.createObjectURL(file)});

        for(let i=0;i<readBy.length;i++){
            if(readBy[i]!=senderId){
                let readByPic = await fetch (`http://localhost:5000/users/profilepic/${readBy[i]}`, {method:'GET'});
                const readByFile = await readByPic.blob();
                imagesArr.push(URL.createObjectURL(readByFile));
            }
           
        }
        this.setState({readImgURL: imagesArr});
       
    }

    render(){
        const {uid, senderId, content} = this.props;
        const {senderImgURL} = this.state;

        let read = this.state.readImgURL.map((profileUrl,i)=>{
            return <img className="readImg" key={i}src={profileUrl?profileUrl:loading} alt="profile pic"></img>
        });

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
                        <div>
                            {read}
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