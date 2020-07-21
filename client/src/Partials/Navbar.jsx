import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {uncolorNavbar} from '../store/actions/notificationsActions';
import {Link} from 'react-router-dom';
import './Navbar.css'

import socket from 'socket.io-client';

class Navbar extends Component {
    constructor(){
        super();
        this.signOut = this.signOut.bind(this);
        this.toNotifs = this.toNotifs.bind(this);
    }
    // Function to signout user, making sure they cannot go back and still be logged in
    signOut(e) {
        e.preventDefault();

        const io = socket('http://localhost:5000');

        io.emit('DISCONNECT', {uid: this.props.uid});

        window.localStorage.clear();
        window.location.href='/';
    }

    toNotifs(e){
        e.preventDefault();
        this.props.uncolorNavbar();
        this.props.history.push('/notifications');
    }

    // Return navbar using bootstrap4 and React-Router links
    render() {
        const {newNotif} = this.props;

        const notifColor = (newNotif) ? 'nav-link text-danger' : 'nav-link';

        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed">
                    <div className="container-fluid">
                        <Link to='/' className="navbar-brand">Communicado</Link>
                        
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li>
                                    <Link to='/' className="nav-link pr-lg-5">Home</Link>
                                </li>
                                
                                <li>
                                    <Link to='/messages' className="nav-link pr-lg-5">Messages</Link>
                                </li>
                                <li>
                                    <Link to='/friends'>
                                        <a href='/friends' className="nav-link pr-lg-5">Friends</a>
                                    </Link>
                                </li>
                                <li>
                                    <a onClick= {this.toNotifs} href='/notifications' className={notifColor}>
                                        <a href='/notifications' className="nav-link d-inline-block d-md-none">Notifications</a>
                                        <i className ="fas fa-bell"></i>
                                    </a>
                                </li>
                                <li>
                                    <Link to='/settings' className="nav-link">
                                        <a href='/settings' className="nav-link d-inline-block d-md-none">Settings</a>
                                        <i class="fas fa-user-cog"></i>
                                    </Link>
                                </li>
                                <li>
                                    <a href='/' onClick={this.signOut} class='nav-link'>
                                        <a href='/' onClick={this.signOut} className="nav-link d-inline-block d-md-none">Logout</a>
                                        <i class="fas fa-sign-out-alt"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        uncolorNavbar: () => {dispatch(uncolorNavbar());}
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));