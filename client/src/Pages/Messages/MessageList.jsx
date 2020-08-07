import React, { Component } from 'react'
import MessageCard from './MessageCard'
import './MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unreadMessages: []
        }
        this.handleClick= this.handleClick.bind(this);
    }

    handleClick(){
        this.props.ToggleHidden()
    }
    render() {
        return (
            
            <div className="MessageList">
                <div className= "compose"> 
                    <h1>Messages</h1>
                    <button id ="comp"onClick={this.handleClick}><i className="fa fa-paper-plane-o"></i></button>
                </div>
            
                <form>              
                <div className="searchMsgList">
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <button type="submit"><i className="fa fa-search"></i></button>
                    <input type="text" placeholder="Search Messages..."></input>
                </div>
                </form>
            </div>
        )
    }
}
export default MessageList;