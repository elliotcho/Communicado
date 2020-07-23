import React, {Component} from 'react';
import loading from './loading.jpg';
import axios from 'axios';

class NotifRow extends Component{
    constructor(){
        super();

        this.state={
            firstName: 'Loading...',
            lastName: 'User...',
            imgURL: null
        }
    }

    componentDidMount(){
        const {senderId} = this.props.notif;

        const config = {headers: {'Content-Type': 'application/json'}};

        axios.post('http://localhost:5000/userinfo', {uid: senderId}, config).then(response =>{
            const {firstName, lastName} = response.data;

            this.setState({
                firstName, lastName
            });
        });

        // const data = {action: 'load', uid: senderId};

        //  // Fetch from server functional route using post with stringified data
        //  fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        //  .then(response =>response.blob())
        //  .then(file =>{
        //      // Set state of imgURL to display
        //      this.setState({imgURL: URL.createObjectURL(file)});
        //  });
    }

    render(){
        const {imgURL, firstName, lastName} = this.state;

        const {content, date} = this.props.notif;

        return(
            <div className='row'>
                <img src={imgURL? imgURL: loading} alt='profile'/>

                <div>
                    <p>
                        <strong>{firstName} {lastName}</strong>
                        <span> {content}</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default NotifRow;