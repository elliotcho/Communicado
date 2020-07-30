import React, { Component } from 'react'
import {io} from '../App';
import './FriendCard.css'

class FriendCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            imgURL: null
        }

        this.deleteFriend = this.deleteFriend.bind(this);
    }

    componentDidMount(){
        //load image of user after initial render
        const {_id} = this.props.user;

        const data = {action: 'load', uid: _id};
        const config={'Content-Type': 'application/json'};
        
        // Fetch from server functional route using post with stringified data
        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    deleteFriend(){
        const {_id, firstName, lastName} = this.props.user;

        if(!window.confirm(`Are you sure you want to unfriend ${firstName} ${lastName}?`));

        const {uid, friends, removeFriend} = this.props;

        removeFriend(_id, friends);

        io.emit("CHANGE_FRIEND_STATUS", {status: "Friends", uid, friendId: _id});
    }

    render() {
        const {imgURL} = this.state;

        const {firstName, lastName} = this.props.user;

        return (
            <div className="col-lg-6 col-sm-12 d-flex justify-content-center">
                <div className="FriendCard card bg-light mb-5">
                    <div className="row d-flex justify-content-center text-center no-gutters align-items-center">
                        <div className="col-3 d-flex justify-content-center">
                            <img src={imgURL? imgURL: "//placehold.it/30"} className="img-fluid avatar" alt="tester" />
                        </div>
                        <div className="col-7">
                            <h3 className="card-title">{firstName} {lastName}</h3>
                        </div>
                        <div className="col-1 delete" onClick={this.deleteFriend}>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="col-1 msg">
                            <i className="far fa-comment-dots"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FriendCard;