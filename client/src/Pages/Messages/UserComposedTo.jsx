import React, {Component} from 'react';
import loading from './loading.jpg';

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
        const {firstName, lastName} = this.props.user;

        const {imgURL} = this.state;

        return(
            <div>
                <img src={imgURL? imgURL: loading}
                    style = {{height: '50px', width: '50px'}}
                />

                {firstName} {lastName}
            </div>
        )
    }
}

export default UserComposedTo;