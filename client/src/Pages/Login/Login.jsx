import React, {Component} from 'react';
import './Login.css';

class Login extends Component{
    constructor(){
        super();

        this.state={
            email: '',
            password: ''
        }

        this.toSignup=this.toSignup.bind(this);
    }

    toSignup(){
        this.props.history.push('/signup');
    }

    render(){
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

                <form className='mb-5'>
                    <h1 className='ml-2 mb-5'>Sign in</h1>

                    <input type='email' 
                           email ={this.state.email} 
                           minLength='6' 
                           maxLength='50' 
                           placeholder='Your email here' 
                           required
                    />
                    
                    <input type='password' 
                           password ={this.state.password} 
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

export default Login;