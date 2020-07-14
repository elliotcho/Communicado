import React, {Component} from 'react';
import './ExpandChat.css';

import avatar from './avatar.jpg';

class ExpandChat extends Component{
    render(){
        return(
            <div className ='expandChat'>
               <header>
                    <div className='profile'>
                        <img src = {avatar} className= 'profilePic'/>
                        <h2>Gugsa</h2>
                    </div>
               </header>
               
               <section className = 'chat-box'>
                    <div className ='chat-r'>
                        <div className ='space'></div>
                        
                        <div className='mess mess-r'>
                            <p>ThIs GuY Is CoMeDY</p>
                        </div>
                    
                     
                    </div>
               </section>
            </div>
        )
    }
}

export default ExpandChat;