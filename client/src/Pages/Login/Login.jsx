import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../store/actions/authActions';
import './Login.css';

class Login extends Component{
    constructor(){
        super();

        this.state={
            email: '',
            password: ''
        }

        this.toSignup=this.toSignup.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toSignup(){
        this.props.history.push('/signup');
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.login(this.state);
    }

    render(){
        if(this.props.uid){
            return <Redirect to='/'/>
        }

        return(
            <div className='login text-white'>
                 <nav className='navbar'>
                    <h2 className='navbar-brand ml-3 mt-2'>Communicado</h2>

                    <button className='navbar-toggler' data-toggle='collapse' data-target='#message'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse text-center' id='message'>
                        <ul className='navbar-nav'>
                            Communicado is a full stack messaging application created using the MERN stack,
                            GraphQL, and styled using Bootstrap 
                        </ul>
                    </div>
                </nav>

                <form className='mb-5' onSubmit={this.handleSubmit}>
                    <h1 className='ml-2 mb-5'>Sign in</h1>

                    <input type='email' 
                           name ='email'
                           value ={this.state.email} 
                           onChange={this.handleChange}
                           minLength='6' 
                           maxLength='50' 
                           placeholder='Your email here' 
                           required
                    />
                    
                    <input type='password' 
                           name='password'
                           value ={this.state.password} 
                           onChange={this.handleChange}
                           minLength='6' 
                           maxLength='50' 
                           placeholder='Your password here' 
                           required
                    />
                    
                    <button className='btn btn-success btn-lg'>Login</button>

                    <p onClick={this.toSignup} className='mt-4 ml-2'>Don't have an account? Sign up here!</p>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => {dispatch(login(credentials));}
    }
};

export default withRouter(connect(null, mapDispatchToProps)(Login));