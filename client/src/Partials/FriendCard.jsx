import React, { Component } from 'react'
import {removeFriend} from '../store/actions/friendsActions';
import {loadProfilePic} from '../store/actions/profileActions';
import {io} from '../App';
import './FriendCard.css'

// Friend card to be rendered on friends page for each friend
class FriendCard extends Component {
    constructor(props){
        super(props);
        // Init state

        this.state = {
            imgURL: null
        }

        this.deleteFriend = this.deleteFriend.bind(this);
    }

    // load image of user after initial render
    async componentDidMount(){
        const {_id} = this.props.user;
    
        const imgURL = await loadProfilePic(_id);

        this.setState({imgURL});
    }
    // Delete friend function from props store that asks user to confirm
    deleteFriend(){
        const {_id, firstName, lastName} = this.props.user;
        const {uid, friends, dispatch} = this.props;

        if(!window.confirm(`Are you sure you want to unfriend ${firstName} ${lastName}?`)){
            return;
        }
        
        dispatch(removeFriend(_id, friends));

        // Emit change of friend status to server so that Add Friend is next option
        io.emit("CHANGE_FRIEND_STATUS", {
            status: "Friends", 
            uid, 
            friendId: _id
        });
    }

    render() {
        // Destructure
        const {imgURL} = this.state;
        const {firstName, lastName} = this.props.user;

        return (
            <div className="col-lg-6 col-sm-12 d-flex justify-content-center">
                <div className="FriendCard card bg-light mb-5">
                    <div className="row d-flex justify-content-center text-center no-gutters align-items-center">
                        <div className="col-3 d-flex justify-content-center">
                            <img 
                                src={imgURL? imgURL: "//placehold.it/30"} 
                                className="img-fluid avatar" 
                                alt="tester" 
                            />
                        </div>

                        <div className="col-7">
                            <h3 className="card-title">
                                {firstName} {lastName}
                            </h3>
                        </div>

                        <div className="col-1 delete" onClick={this.deleteFriend}>
                            <i className="fas fa-times"/>
                        </div>

                        <div className="col-1 msg">
                            <i className="far fa-comment-dots"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FriendCard;