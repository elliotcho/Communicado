import React,{Component} from 'react';
import "./ComposeMsg.css";
import io from '../../App'

class ComposeMsg extends Component{
    
constructor(){
    super()
    this.handleKeyDown= this.handleKeyDown.bind(this)
}
handleKeyDown(e){
    io.emit('GET_RECIPENTS', {
        
    })
}

    render(){
        return(
            <div>
                <header>
                    <div className='To'>
                    
                    <input  onKeyDown ={this.handleKeyDown} type="text" placeholder="To..."></input>
                    </div>
               </header>
            </div>
        )
    }
}
export default ComposeMsg