import React,{Component} from 'react';
import "./ComposeMsg.css";

class ComposeMsg extends Component{
    
    render(){
        return(
            <div>
                <header>
                    <div className='To'>
                    <button type="submit"><i className="fa fa-search"></i></button>
                    <input type="text" placeholder="To..."></input>
                    </div>
               </header>
            </div>
        )
    }
}
export default ComposeMsg