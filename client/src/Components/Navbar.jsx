import React, { Component } from 'react'
import './Navbar.css'

class Navbar extends Component {
    render() {
        return(
            <div className="Navbar">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Communicado</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-dark" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active pr-5">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item pr-5">
                                <a className="nav-link" href="#">Messages</a>
                            </li>
                            <li className="nav-item pr-5">
                                <a className="nav-link" href="#">Friends</a>
                            </li>
                            <li className="nav-item pr-5">
                                <a className="nav-link" href="#">
                                    <i className="fas fa-bell"></i>
                                </a>
                            </li>
                            <li className="nav-item pr-5">
                                <a className="nav-link" href="#">
                                    <i className ="fas fa-user-cog"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </nav>
            </div>
        )
    }
}
export default Navbar;