import React, { Component } from 'react'
import './SearchProfileCard.css'
import loading from './loading.jpg';

class SearchProfileCard extends Component {
    constructor(){
        super();

        this.state ={
            imgURL: null
        };
    }

    componentDidMount(){
        const {_id} = this.props.user;

        const config = {'content-type': 'application/json'};

        const data = {action: 'load', uid: _id};

        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            // Set state of imgURL to display senders IMG
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    render() {
        const {firstName, lastName} = this.props.user;

        const {imgURL} = this.state;

        return(
            <div>
                <div className = "searchProfileCard">
                    <div class="row sideBar-body">
                    
                        <div class="col-sm-3 sideBar-avatar">
                            <div class="avatar-icon">
                                <img src={imgURL? imgURL:loading}></img>
                            </div>
                        </div>
                        <div class="col-sm-9 sideBar-main">
                            
                                <div class="col-sm-8 sideBar-name">
                                    <span class="name-meta">{firstName} {lastName}</span>
                                </div>
                                <div class="col-sm-3 float-right sideBar-time">
                                    <a class="btn btn-info btn-sm glyphicons PlusCircleIcon size={24}" href="#" title="View"></a>
                                </div>  
                            
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchProfileCard