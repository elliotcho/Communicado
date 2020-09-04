import React, {Component} from 'react';
import loading from '../../images/loading.jpg';
import './UserComposedTo.css';

class UserComposedTo extends Component{
    constructor(){
        super();
        this.state = {
            imgURL: null
        }
    }

    async componentDidMount(){
        const {_id} = this.props.user;

        let response = await fetch(`http://localhost:5000/users/profilepic/${_id}`, {method: 'GET'}); 
        const file = await response.blob();

        this.setState({imgURL: URL.createObjectURL(file)});
    }

    render(){
        const {addRecipient, user} = this.props;

        const {firstName, lastName} = this.props.user;

        const {imgURL} = this.state;

        return(
            <div className='user-composed-to' onClick={() => {addRecipient(user)}}>
                <img src={imgURL? imgURL: loading} id='test' alt ='profile pic'/>
                
                <p>
                    {firstName} {lastName}
                </p>
            </div>
        )
    }
}

export default UserComposedTo;