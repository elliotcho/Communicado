import React, { Component } from 'react'
import './FilterForm.css'

class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { friendQuery: "" };
        this.handleChange = this.handleChange.bind(this);
    }

    // Handle change in input to adjust state every character
    handleChange(evt) {
        this.setState({ [evt.target.name] : evt.target.value });
    }

    render() {
        return (
            <div className="row my-4 py-3 d-flex justify-content-center text-center">
                <div className = "col-12">
                    <form>
                        <label htmlFor="friendQuery">Search through your friends list: </label>
                        <input 
                            type = "text"
                            name = "friendQuery"
                            value = {this.state.friendQuery}
                            onChange = {this.handleChange}
                            placeholder = "Friend name"
                            className="FilterForm-inp"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default FilterForm;