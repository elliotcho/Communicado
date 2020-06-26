import React, { Component } from 'react';
import './Friends.css'
import Navbar from '../../Partials/Navbar'

class Friends extends Component {
    constructor(props) {
        super(props);
        // Set initial state and bind any methods
        this.state = {friendQuery: ""}
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
                        <div className="col-12 d-flex justify-content-center">
                            <form className="Friends-form">
                                <input
                                    type="text"
                                    name="friendQuery"
                                    value={this.state.friendQuery}
                                    onChange={this.handleChange}
                                    placeholder="Find a friend"
                                />
                            </form>
                        </div>
                    </div>
                    <div className="row">
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
                    <div className="row">
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