import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css'

class Navbar extends Component {
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed">
                    <div className="container-fluid">
                        <a className="navbar-brand">Communicado</a>
                        
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li>
                                    <Link to='/home' className="nav-link">Home</Link>
                                </li>
                                
                                <li>
                                    <a className="nav-link">Messages</a>
                                </li>
                                <li>
                                    <a className="nav-link">Friends</a>
                                </li>
                                <li>
                                    <a className="nav-link">Notifs</a>
                                </li>

                                <li>
                                    <Link to='/settings' className="nav-link">Settings</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar;