import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveUserInfo} from '../../reducers/rootReducer';
import './Home.css';
import Navbar from '../../Partials/Navbar'

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
        if(this.props.userInfo._id === ''){
            this.props.saveUserInfo(JSON.parse(window.localStorage.getItem('userInfo')));

            this.setState({
                userInfo: JSON.parse(window.localStorage.getItem('userInfo'))
            }, ()=>{
                window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));        
                this.loadProfile(this.state.userInfo._id);
            });
        }
        
        else{
            this.setState({
                userInfo: this.props.userInfo
            }, ()=>{
                window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));        
                this.loadProfile(this.state.userInfo._id);
            });
        }
    }

    loadProfile(id){
        const data={action: 'load', id}

        const config={'Content-Type': 'application/json'};

        fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
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
    
            axios.post('http://localhost:5000/profilepic', formData, config)
            .then(()=>{});
        });
    }

    render(){
        const {imgURL} = this.state;
        const {firstName, lastName} =this.state.userInfo;

        return(
            <div className='home'>
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-sm-12 col-md-7">
                            <section className='message'>
                                <h3>Gugsa Challa</h3>
                                <p className='text-muted date'>5 minutes ago</p>
                                <p className='content'>This guy is comedy!!!</p>
                            </section>
                        </div>

                        <div className="col-sm-12 col-md-5 col-xl-4">
                            <div className='profileCard'>
                                <h2>{firstName} {lastName}</h2>
                                <img className="profilePic" src={imgURL ? imgURL: loading} alt="profile pic"></img>
                                <input id='upload' type='file' accept='jpg jpeg png' style={{visibility: 'hidden'}} onChange={this.handleChange}/>
                                <label htmlFor='upload' className='btn-lg btn-primary ml-3'>Change Profile Pic</label>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
    
                </footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserInfo: (userInfo) => {dispatch(saveUserInfo(userInfo));}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);