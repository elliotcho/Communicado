import React, {Component} from 'react';
import './Home.css';

class Home extends Component{
    render(){
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
                    <h2>Tariq Hirji</h2>

                    <div className='profilePic'>
                        
                    </div>

                    <button>Change Profile Pic</button>
                </aside>

                <footer>
    
                </footer>
            </div>
        )
    }
}

export default Home;