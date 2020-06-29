import React, { Component } from 'react'
import axios from 'axios'
import './Signup.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        // Set initial state and bind all helper functions
        this.state = { firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toLogin = this.toLogin.bind(this);
    }
    
    // Change the state name to the value that the user is typing
    handleChange(evt) {
        this.setState({ [evt.target.name] : evt.target.value });
    }

    toLogin() {
        this.props.history.push('/');
    }

    handleSubmit(evt) {
        evt.preventDefault();

        // Create data object with form values
        const data = {...this.state};

        // Basic config for "post" axios method
        const config = {
            headers: {'Content-Type': 'application/json'}
        }

        // Use axios to post message to server
        axios.post('http://localhost:5000/signup', data, config).then(response => {
            if (response.data.msg === 'Success') {
                this.props.history.push('/');
            } else {
                alert(response.data.msg)
            }
        })
    }


    render() {
        return(
            <div className="Signup">
                <form className="Signup-form" onSubmit={this.handleSubmit}>
                    <h1 className="Signup-title">Communicado</h1>
                    <h3>Create a free account today!</h3>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={this.state.firstName} 
                        onChange={this.handleChange}
                        minLength='2'
                        maxLength='30'
                        placeholder="First Name"
                        className="Signup-input"
                    />

                    <input 
                        type="text" 
                        name="lastName" 
                        value={this.state.lastName} 
                        onChange={this.handleChange}
                        minLength='2'
                        maxLength='30'
                        placeholder="Last Name"
                        className="Signup-input"
                    />

                    <br/>

                    <input 
                        type="email" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.handleChange}
                        minLength='6'
                        maxLength='50'
                        placeholder="Email"
                        className="Signup-input Signup-input-long"
                    />

                    <br/>

                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange}
                        minLength='6'
                        maxLength='50'
                        placeholder="Password"
                        className="Signup-input"
                    />

                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange}
                        minLength='6'
                        maxLength='50'
                        placeholder="Confirm Password"
                        className="Signup-input"
                    />

                    <br/>
                    
                    <button className="Signup-submit-btn">Create Account</button>
                    <p onClick={this.toLogin} className="Signup-p">Already have an account? Sign in here</p>
                </form>
            </div>
        ) 
    }
}

export default Signup;