import React, {Component} from 'react';
import './SendMsg.css';

class SendMsg extends Component{


    render(){
        return(
            <div className= "msg">
                <input id="message" type= "text" placeholder="Message"/>
                <button id="send">Send</button>
            </div>
        )
    }

    
}

export default SendMsg;