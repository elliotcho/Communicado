import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filterMsgCards} from '../../store/actions/messagesActions';
import './SearchMsgs.css';

class SearchMsgs extends Component{
    constructor(){
        super();

        this.state = {
            query: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault();

        const {uid, dispatch} = this.props;
        const {query} = this.state;
        
        dispatch(filterMsgCards(uid, query));
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    render(){
        const {query} = this.state;

        return(
            <div className="searchMsgsList">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text' 
                        id = 'query'
                        placeholder='Search Messages...' 
                        value = {query}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>({dispatch});

export default connect(null,mapDispatchToProps)(SearchMsgs);