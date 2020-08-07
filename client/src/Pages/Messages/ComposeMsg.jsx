import React,{Component} from 'react';
import {connect} from 'react-redux';
import {io} from '../../App';
import UserComposedTo from './UserComposedTo';
import "./ComposeMsg.css";

class ComposeMsg extends Component{
    constructor(){
        super();
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(e){
        const {uid} = this.props;

        if(e.target.value.trim() === ""){
            return;
        }

        io.emit('GET_RECIPIENTS', {
            uid, name: e.target.value
        });
    }
    
    render(){
        const {queryResults} = this.props;

        return(
            <div>
                <header>
                    <div className='To'>
                        <input 
                            type="text" 
                            placeholder="To..."
                            onChange = {this.handleChange}
                        />
                    </div>
               </header>

               {queryResults.map(user =>
                    <UserComposedTo 
                        key={user._id}
                        user = {user}
                    />
               )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        queryResults: state.messages.queryResults
    }   
}

export default connect(mapStateToProps)(ComposeMsg);