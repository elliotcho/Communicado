import React, { Component } from 'react'
import './SearchProfileCard.css'
import avatar from './avatar6.png';


class SearchProfileCard extends Component {
    render() {
        return(
            <div>
                <div className = "searchProfileCard">
                    <div class="row sideBar-body">
                    
                        <div class="col-sm-3 sideBar-avatar">
                            <div class="avatar-icon">
                                <img src={avatar}></img>
                            </div>
                        </div>
                        <div class="col-sm-9 sideBar-main">
                            
                                <div class="col-sm-8 sideBar-name">
                                    <br></br>
                                    <span class="name-meta">John Doe
                                    </span>
                                </div>
                                <div class="col-sm-4 pull-right sideBar-time">
                                <a  class="btn btn-info btn-xs glyphicon glyphicon-plus" href="#" title="View"></a>
                                </div>  
                            
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchProfileCard