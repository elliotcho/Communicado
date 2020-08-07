import React, {Component} from 'react';
import './ExpandChat.css';
import avatar from './avatar.jpg';
import SendMsg from './SendMsg';


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
              

            </div>
        )
    }
}

export default ExpandChat;