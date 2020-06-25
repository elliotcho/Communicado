import React, {Component} from 'react';
import './Home.css';

import loading from './loading.jpg';

const axios=require('axios');

class Home extends Component{
    constructor(){
        super();

        this.state={
            imgURL: null,
            userInfo: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.loadProfile=this.loadProfile.bind(this);
    }

    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
            this.setState({userInfo: this.props.location.state.userInfo}, ()=>{
                window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));
                this.loadProfile(this.state.userInfo._id);
            });
        }

        else{
            this.setState({userInfo: JSON.parse(window.localStorage.getItem('userInfo'))}, ()=>{
                window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));
                this.loadProfile(this.state.userInfo._id);
            });
        }
    }

    loadProfile(id){
        const data={action: 'load', id}

        const config={'Content-Type': 'application/json'};

        fetch('/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
        .then(response =>response.blob())
        .then(file =>{
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    handleChange(e){
        const imgFile = e.target.files[0];

        this.setState({imgURL: URL.createObjectURL(imgFile)}, ()=>{
            const formData =new FormData();

            formData.append('id', this.state.userInfo._id);
            formData.append('image', imgFile);
    
            const config = {headers: {'Content-Type': 'multipart/form-data'}};
    
            axios.post('/profilepic', formData, config)
            .then(()=>{});
        });
    }

    render(){
        const {imgURL} = this.state;
        const {firstName, lastName} =this.state.userInfo;

        return(
            <div className='home'>
                <nav>

                </nav>

                <section className='message'>
                    <h3>Gugsa Challa</h3>
                    <p className='text-muted date'>5 minutes ago</p>
                    <p className='content'>This guy is comedy!!!</p>
                </section>

                <section className='message'>
                    <h3>Gugsa Challa</h3>
                    <p className='text-muted date'>5 minutes ago</p>
                    <p className='content'>This guy is comedy!!!</p>
                </section>

                <section className='message'>
                    <h3>Gugsa Challa</h3>
                    <p className='text-muted date'>5 minutes ago</p>
                    <p className='content'>This guy is comedy!!!</p>
                </section>

                <section className='message'>
                    <h3>Gugsa Challa</h3>
                    <p className='text-muted date'>5 minutes ago</p>
                    <p className='content'>This guy is comedy!!!</p>
                </section>

                <aside className='profileCard'>
                    <h2>{firstName} {lastName}</h2>

                    <img className='profilePic' src={imgURL? imgURL: loading} alt='profile pic'></img>

                    <input id='upload' type='file' accept='jpg jpeg png' style={{visibility: 'hidden'}} onChange={this.handleChange}/> 

                    <label htmlFor='upload' className='btn-lg btn-primary ml-3'>Change Profile Pic</label>
                </aside>

                <footer>
    
                </footer>
            </div>
        )
    }
}

export default Home;