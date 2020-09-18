import React, {Component} from 'react';
import { searchMessageCards } from '../../store/actions/messagesActions';
import './SearchMsgs.css';
import {connect} from 'react-redux';

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
        const {uid,dispatch} = this.props;
        
        const cardOrder = await searchMessageCards(uid,this.state.text);
        //alert(cardOrder[0]);//cardOrder is gonna be an array of the new order of messageCards
        //alert(cardOrder);
        dispatch(cardOrder);
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
const mapDispatchToProps = (dispatch)=>({dispatch});
export default connect(null,mapDispatchToProps)(SearchMsgs);