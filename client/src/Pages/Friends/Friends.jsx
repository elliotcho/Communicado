import React, { Component } from 'react';
import {connect} from 'react-redux';
import {findUsers} from '../../store/actions/friendsActions';
import Navbar from '../../Partials/Navbar'
import FindForm from '../../Partials/FindForm'
import FilterForm from '../../Partials/FilterForm'
import './Friends.css'
import FriendGrid from './FriendGrid';


// Friends Page composed of separate components that make up the page
class Friends extends Component {
    render() {
        // console.log(this.props.users);
        return (
            <div className="Friends">
                <Navbar />
                <div className="container-fluid">
                    <FindForm findUsers = {this.props.findUsers}/>
                    <FilterForm />

                    <FriendGrid />
                </div>
            </div>
        )
    }
}

//put data from reducer into props
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users,
        uid: state.auth.uid
    }
}

//puts actions into props
const mapDispatchToProps = (dispatch) =>{
    return {
        findUsers: (name) => {dispatch(findUsers(name));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);