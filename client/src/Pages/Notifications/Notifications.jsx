import React, {Component} from 'react';
import './Notifications.css'
import loading from './loading.jpg';

const axios=require('axios');

class Notifications extends Component{
    render(){
        return(
            <div className="notifs">
                <header>
                    <h1>Notifications</h1>
                </header>

	            <h4>Latest</h4>

                <div className='row'>
                    <img src={loading} alt='profile'/>
        
                    <div>
                        <p>
                            <strong>Gugsa Challa</strong>
                            <span> liked your picture!</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notifications;