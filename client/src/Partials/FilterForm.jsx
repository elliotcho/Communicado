import React, { Component } from 'react';
import {findFriends} from '../store/actions/friendsActions';
import './FilterForm.css'

// Class that creates form that filters through a friends list 
// Takes up a row, goes in a container
class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            friendQuery: "" 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle change in input to adjust state every character
    handleChange(evt) {
        this.setState({ [evt.target.name] : evt.target.value });
    }

    // Trim result on submit and findFriends from props with given query
    handleSubmit(e){
        e.preventDefault();
        
        const {friendQuery} = this.state;
        
        if(friendQuery.trim() === "") { 
            return; 
        }
        
        const {uid, dispatch} = this.props;
        
        dispatch(findFriends(friendQuery, uid));
    }

    render() {
        const {friendQuery} = this.state;

        return (
            <div className="row my-4 py-3 FilterForm">
                <div className = "col-12 d-flex justify-content-center text-center">
                    <form className="FilterForm-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="friendQuery">Search your friends: </label>
                        <input 
                            type = "text"
                            name = "friendQuery"
                            value = {friendQuery}
                            onChange = {this.handleChange}
                            placeholder = "Name"
                            className="FilterForm-inp"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default FilterForm;