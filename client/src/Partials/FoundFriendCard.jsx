import React, { Component } from 'react'
import { connect } from 'react-redux';
import './FoundFriendCard.css'

class FoundFriendCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            imgURL: "//placehold.it/10"
        }
    }

    componentDidMount(){
        const {_id} = this.props.user;

        const data = {action: 'load', uid: _id};
        const config={'Content-Type': 'application/json'};
        
        // Fetch from server functional route using post with stringified data
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    render() {
        const {
            firstName,
            lastName
        } = this.props.user;

        const {imgURL} = this.state;

        return (
            <div className="FoundFriendCard card col-2">
                <img src={imgURL} className="card-img-top" alt="user icon" id="userIcon"/>
                <div className="card-body">
                    <h5 className="card-title">
                        {firstName} {lastName}
                    </h5>
                </div>
                <div className="card-footer">
                    Add btn
                </div>
            </div>
        )
    }
}

// put data from reducer into props
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users,
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(FoundFriendCard);