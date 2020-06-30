import React, { Component } from 'react';
import './Friends.css'
import Navbar from '../../Partials/Navbar'

class Friends extends Component {
    constructor(props) {
        super(props);
        // Set initial state and bind any methods
        this.state = {allUserQuery: "", friendQuery: ""}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name] : evt.target.value});
    }

    render() {
        return (
            <div className="Friends">
            <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <h1 className="Friends-title">Friends</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="jumbotron d-flex flex-column justify-content-center align-items-center mb-3">
                            <h4>Search for new friends!</h4>
                            <form className="Friends-form">
                                <label htmlFor="allUserQuery"></label>
                                <input
                                    type="text"
                                    name="allUserQuery"
                                    value={this.state.allUserQuery}
                                    onChange={this.handleChange}
                                    placeholder="Browse profiles"
                                />
                                <button><i class="fas fa-search"></i></button>
                            </form>
                        </div>
                    </div>
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
                </div>
            </div>
        )
    }
}
export default Friends;