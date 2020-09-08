import React, {Component} from 'react';
import {getUserData, loadProfilePic} from '../../store/actions/profileActions';
import loading from '../../images/loading.jpg';

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
        const {uid, show} = this.props;

        if(show){
            const user = await getUserData(uid);
            const imgURL = await loadProfilePic(uid);

            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                imgURL
            });
        }
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

        const style = {
            width: '50px',
            height: '50px'
        }

        const show = (this.props.show)? '': 'none';

        return(
            <div style={{display: show}}>
                <img 
                    src = {imgURL? imgURL: loading} 
                    alt = 'profile pic' 
                    style={style}
                />

                <p>{firstName} {lastName} is typing...</p>
            </div>
        )   
    }
}

export default TypingBubble;