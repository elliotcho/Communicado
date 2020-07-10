import React, { Component } from 'react';
import {connect} from 'react-redux';
import {findUsers} from '../../store/actions/friendsActions';
import FriendCard from './FriendCard'
import './Friends.css'
import Navbar from '../../Partials/Navbar'

class Friends extends Component {
    constructor() {
        super();
        // Set initial state and bind any methods
        this.state = {allUserQuery: "", friendQuery: ""}
        this.handleChange = this.handleChange.bind(this);
        this.globalSearch = this.globalSearch.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name] : evt.target.value});
    }

    globalSearch(e){
        e.preventDefault();

        this.props.findUsers(this.state.allUserQuery);
    }

    render() {
        console.log(this.props.users);

        return (
            <div className="Friends">
            <Navbar />
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="jumbotron d-flex flex-column justify-content-center align-items-center mb-3">
                            <h4>Search for new friends!</h4>
                            <form className="Friends-form" onSubmit={this.globalSearch}>
                                <label htmlFor="allUserQuery"></label>
                                <input
                                    type="text"
                                    name="allUserQuery"
                                    value={this.state.allUserQuery}
                                    onChange={this.handleChange}
                                    placeholder="Browse all profiles"
                                />
                                <button><i class="fas fa-search"></i></button>
                            </form>
                        </div>
                    </div>

                    {this.props.users? this.props.users.map(user =>{
                        return <li key={user._id}>{user.firstName} {user.lastName}</li>
                    }): null}

                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <form className="Friends-form mb-4">
                                <label htmlFor="friendQuery">Search through your friends list: </label>
                                <input
                                    type="text"
                                    name="friendQuery"
                                    value={this.state.friendQuery}
                                    onChange={this.handleChange}
                                    placeholder="Browse friends"
                                    className="Friends-input"
                                />
                            </form>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Gugsa Challa</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Elliot Cho</h5>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Tariq Hirji</h5>
                                </div>
                            </div> 
                        </div>
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Billy Bob</h5>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="row no-gutters">
                        {/* <FriendCard /> */}
                        {/* <FriendCard /> */}
                    </div>
                </div>
            </div>
        )
    }
}

//put data from reducer into props
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users
    }
}

//puts actions into props
const mapDispatchToProps = (dispatch) =>{
    return {
        findUsers: (name) => {dispatch(findUsers(name));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);