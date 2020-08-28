import React, {Component} from 'react';
import loading from './loading.jpg';
import axios from 'axios';

class TypingBubble extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null,
            firstName: '',
            lastName: ''
        }
    }

    async componentDidMount(){
        const {uid} = this.props;

        let response = await axios.get(`http://localhost:5000/users/${uid}`);
        const {firstName, lastName} = response;

        //get profile picture of the user typing
        response = await fetch(`http://localhost:5000/users/profilepic/${uid}`, {
            method: 'GET'
        }); 
        
        let file = await response.blob();

        this.setState({
            firstName,
            lastName,
            imgURL: URL.createObjectURL(file)
        });
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

        const style = {
            width: '50px',
            height: '50px'
        }

        return(
            <div>
                <img src = {imgURL? imgURL: loading} alt = 'profile pic' style={style}/>
                {firstName} {lastName} is typing...
            </div>
        )   
    }
}

export default TypingBubble;