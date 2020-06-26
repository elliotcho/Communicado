import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveUserInfo, changeUserName, changePwd} from '../../reducers/rootReducer';
import './Notifications.css';
import Navbar from '../../Partials/Navbar';

const axios=require('axios');

class Notifications extends Component(){

 clearAll(){
    confirm("Clear All?");
}

    render(){
        return(
            <div className="notifications">
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link href="cards.css" rel="stylesheet" type="text/css" />
                <link href="https://fonts.googleapis.com/css?family=Balsamiq+Sans" rel="stylesheet"/>
	            <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"/>


                <header>
                    <nav>
                        <h1>Notifications</h1>
                    </nav>
                    <button class="clear" onclick="clearAll()"><i class="fa fa-close"></i> Clear All</button>
                </header>

                <hr></hr>
	            <h4>Latest</h4>
	            <hr></hr>

                <div class="row">
                    <div class="col-sm-11">
	                    <div>
                            <div class="row no-gutters">
                                <div class="col-md-1">
                                    <img src="IMG-4180.jpg" class="card-img" ></img>
                                </div>
                                <div class="col-md-11">
                                    <div class="card-body">
                                        <p class="card-text"><strong>Gugsa Challa</strong> liked your picture!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-0">
  	                    <button class="clearOne"><i class="fa fa-trash"></i></button>
                    </div>
                </div>

            
            
            </div>
        )
    }
}