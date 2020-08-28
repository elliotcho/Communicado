import React, { Component } from 'react';
import axios from 'axios';
import './MessageCard.css';
import {withRouter} from 'react-router-dom';

class MessageCard extends Component {
    constructor(){
        super();
        this.state = {
            memberNames: 'Loading Users...',
            imgURL: [],
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(){
        const {chatId} = this.props;
        this.props.history.push(`/chat/${chatId}`);
    }

    async componentDidMount(){
        const {uid, chatId} = this.props;

        const {imgURL} = this.state;

        let response = await axios.post('http://localhost:5000/chats/members', {uid, chatId});
        const {memberNames} = response.data;

        response = await axios.post('http://localhost:5000/chats/chatpic', {uid, chatId});
        const {members} = response.data;

        //get the chat picture
        for(let i=0;i<2;i++){
            response = await fetch(`http://localhost:5000/users/profilepic/${members[i]}`, {
            method: 'GET'
        }); 
  
        let file = await response.blob();

        let img = URL.createObjectURL(file)

        this.setState({
            memberNames,
            imgURL: [...this.state.imgURL, img]
        });
        }
        /*
        if(imgURL.length >= 2) {
            this.setState({imgURL: imgURL[1]})
        }

        else if(imgURL.length === 0) {
            this.setState({imgURL: "//placehold.it/50"})
        }
        else if(imgURL.length === 1){
            this.setState({imgURL: imgURL[0]})
        }
        */
        
    }

    render() {
        const {memberNames, imgURL} = this.state;
        
        const {isActive, lastMsg} = this.props;

        const cardClassName = (isActive)? 'active': ''

        const chatPics = []
        for(let i=0; i<imgURL.length;i++){
            chatPics.push(<img src={imgURL[i]} alt="profile pic" style={{marginLeft: `-${i * 15}px`}}/>)
        }

        return (
            <div onClick={this.handleClick} className={`MessageCard ${cardClassName} card flex-row flex-wrap`}>
                <div class="card-header border-0">

                {chatPics}

                </div>
                <div className="card-block px-2">
                    <h3 className="card-title">{memberNames}</h3>
                    <p className="card-text text-muted">{lastMsg.content}</p>
                </div>
            </div>
        )
    }
}
export default withRouter(MessageCard);