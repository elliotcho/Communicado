import React, {Component} from 'react';
import './ToastMsg.css';
import {Link, BrowserRouter} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class ToastMsg extends Component{

    constructor(){
        super();
        this.toNotifs = this.toNotifs.bind(this);
    }

    toNotifs(e){
        e.preventDefault();
        this.props.history.push('/notifications');
    }
    render(){
        //R: Make message card responsive, use real code and not dummy code
        return(
            <div>
                <div class="ToastMsg card flex-row flex-wrap" onClick={this.toNotifs}>
                    <div class="card-header border-0" >
                        <img src="//placehold.it/100" alt="" />
                    </div>
                    <div class="card-block px-2">
                        <h4 class="card-title">Elliot Cho</h4>
                        <br></br>
                        <p class="card-text">sent you a friend request!</p>
                    </div>
                    
                    
                </div>  
            </div>
        )
    }
}

export default withRouter(ToastMsg);