import React, {Component} from 'react';
import { searchMessageCards } from '../../store/actions/messagesActions';
import './SearchMsgs.css';

class SearchMsgs extends Component{
    constructor(props){
        super();
        this.state = {
            text:""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault();
        const {uid} = this.props;
        
        const cardOrder = await searchMessageCards(uid,this.state.text);
        //alert(cardOrder[0]);//cardOrder is gonna be an array of the new order of messageCards
        alert(cardOrder);
    }

    handleChange(e){
        e.preventDefault();
        const {value, type} = e.target;
        this.setState({[type]:value});
    }

    render(){
        return(
            <div className="searchMsgsList">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search Messages..." onChange={this.handleChange}></input>
                </form>
            </div>
        )
    }
}

export default SearchMsgs;