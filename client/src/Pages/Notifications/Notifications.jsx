import React, {Component} from 'react';
import Navbar from '../../Partials/Navbar';

const axios=require('axios');

class Notifications extends Component{
    render(){
        return(
            <div className="notifications">
                <Navbar/>

                <header>
                    <h1>Notifications</h1>
                </header>

            </div>
        )
    }
}

export default Notifications;