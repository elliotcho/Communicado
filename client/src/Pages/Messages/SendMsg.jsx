import React, {Component} from 'react';
import './SendMsg.css';

class SendMsg extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
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

    render(){
        return(
            <div className= "send-msg">
                <form ref = {ele => this.msgForm = ele}>
                    <textarea
                        className =' form-control'
                        rows = '1'
                        placeholder = 'Type a message...'
                        ref = {ele => this.msg = ele}
                        onKeyDown = {this.pressEnter}
                    />

                    <label>
                        <i className = 'fas fa-file-image'/>
                    </label>
                </form>
            </div>
        )
    }
}

export default SendMsg;