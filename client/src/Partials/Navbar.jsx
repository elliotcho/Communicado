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
                                    <Link to='/home' className="nav-link pr-lg-5">Home</Link>
                                </li>
                                
                                <li>
                                    <a className="nav-link pr-lg-5">Messages</a>
                                </li>
                                <li>
                                    <a className="nav-link pr-lg-5">Friends</a>
                                </li>
                                <li>
                                    <a className="nav-link">
                                        <a className="nav-link d-inline-block d-md-none">Notifications</a>
                                        <i class="fas fa-bell"></i>
                                    </a>
                                </li>
                                <li>
                                    <Link to='/settings' className="nav-link">
                                        <a className="nav-link d-inline-block d-md-none">Settings</a>
                                        <i class="fas fa-user-cog"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/' class='nav-link'>
                                        <a className="nav-link d-inline-block d-md-none">Logout</a>
                                        <i class="fas fa-sign-out-alt"></i>
                                    </Link>
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