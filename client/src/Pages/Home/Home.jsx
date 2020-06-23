import React, {Component} from 'react';
import './Home.css';

import avatar from './avatar.jpg';

class Home extends Component{
    constructor(){
        super();

        this.state={
            imgURL: null,
            userInfo: {}
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
            this.setState({userInfo: this.props.location.state.userInfo}, ()=>{
                window.localStorage.setItem('userInfo', this.state.userInfo);
            });
        }

        else{
            this.setState({userInfo: JSON.parse(window.localStorage.getItem('userInfo'))}, ()=>{
                window.localStorage.setItem('userInfo', this.state.userInfo);
            });
        }
    }

    handleChange(e){
        const imgFile = e.target.files[0];

        this.setState({imageURL: URL.createObjectURL(imgFile)}, ()=>{
            const formData =new FormData();

            formData.append('image', imgFile);
            formData.append('id', this.state.userInfo.id);
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

                    <img className='profilePic' src={imgURL? imgURL: avatar} alt='profile pic'></img>

                    <input type='file' accept='jpg jpeg png' style={{visibility: 'hidden'}} onChange={this.handleChange}/> 

                    <label className='btn-lg btn-primary ml-3'>Change Profile Pic</label>
                </aside>

                <footer>
    
                </footer>
            </div>
        )
    }
}

export default Home;