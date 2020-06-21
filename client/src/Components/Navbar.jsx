import React, { Component } from 'react'
import './Navbar.css'

class Navbar extends Component {
    render() {
        return(
            <div className="Navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand">Communicado</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Messages</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Friends</a>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        )
    }
}
export default Navbar;