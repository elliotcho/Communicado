import React, { Component } from 'react'
import FoundFriendCard from './FoundFriendCard'
import './FindForm.css'

// Component that allows a user to type a name and finds all users
class FindForm extends Component {
    // State - form query that user is entering
    constructor(props) {
        super(props);

        this.state = { 
            nameQuery: "" 
        };

        this.handleChange = this.handleChange.bind(this);
        this.globalSearch = this.globalSearch.bind(this);
        this.showResults = this.showResults.bind(this);
    }
    // Handle change in input to adjust state every character
    handleChange(evt) {
        this.setState({ [evt.target.name] : evt.target.value })
    }

    globalSearch(e) {
        e.preventDefault();

        if(this.state.nameQuery === ""){return;}

        this.props.findUsers(this.state.nameQuery);
    }
    // Function that shows the hidden row when form is submit
    showResults() {
        let row = document.getElementById("resultsContainer")
        if (row.style.display === "none") {
            row.style.display = "block";
        } else {
            row.style.display = "none";
        }
    }

    // Use BS4 to display form in jumbotron
    render() {
        const foundUsers = this.props.users.map(user =>
            <FoundFriendCard key={user._id} user = {user}/>
        );

        return (
            <div className="jumbotron d-flex flex-column justify-content-center align-items-center mb-3">
                <div className="row">
                    <h2 className="FindForm-title">Search for new friends!</h2>
                </div>
                <div className="row FindForm-form">
                    <form onSubmit={this.globalSearch}>
                        <input 
                            type = "text"
                            name = "nameQuery"
                            value = {this.state.nameQuery}
                            onChange = {this.handleChange}
                            placeholder = "Enter a users name"
                            className="FindForm-input"
                        />
                        <button onClick = {this.showResults} className="FindForm-btn">
                            <i className="fas fa-search FindForm-icon"></i>
                        </button>
                    </form>
                </div>
                {/* Hidden container that displays when form is submitted */}
                <div className="container" style={{display: 'none'}} id="resultsContainer">
                    <div className="row d-flex justify-content-center align-items-center" id="resultsRow">
                        {foundUsers}
                    </div>
                </div>
            </div>
        )
    }

}

export default FindForm;