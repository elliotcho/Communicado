import React, {Component} from 'react';
import './SearchMsgs.css';

class SearchMsgs extends Component{
    render(){
        return(
            <div className="searchMsgsList">
                <form>
                    <input type="text" placeholder="Search Messages..."></input>
                </form>
            </div>
        )
    }
}

export default SearchMsgs;