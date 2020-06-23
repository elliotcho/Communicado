import React, {Component} from 'react';
import './Home.css';
import Navbar from '../../Components/Navbar'

class Home extends Component{
    render(){
        return(
            <div className='home'>
                <Navbar />
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
                    <h2>Tariq Hirji</h2>

                    <div className='profilePic'>
                        
                    </div>

                    <button className='btn-lg btn-primary ml-3'>Change Profile Pic</button>
                </aside>

                <footer>
    
                </footer>
            </div>
        )
    }
}

export default Home;