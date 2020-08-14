import React, {Component} from 'react';
import loading from './loading.jpg';
import './UserComposedTo.css';

class UserComposedTo extends Component{
    constructor(){
        super();
        this.state = {
            imgURL: null
        }
    }

    componentDidMount(){
        const {_id} = this.props.user;

        const data = {action: 'load', uid: _id};

        const config = {'content-type': 'application/json'};

        // Fetch from server functional route using post with stringified data
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display senders IMG
            this.setState({imgURL: URL.createObjectURL(file)});
        });
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