import React, { Component } from 'react';
import Navbar from '../../Partials/Navbar';
import MessageList from './MessageList'
import ExpandChat from './ExpandChat';
import './Messages.css'
import SendMsg from './SendMsg'
import ComposeMsg from './ComposeMsg'
class Messages extends Component {

    constructor(){
        super()
        this.state={
            isHidden: false
        }
        this.ToggleHidden= this.ToggleHidden.bind(this)
    }


    ToggleHidden(){
        const {isHidden} = this.state
        //const isHidden= this.state.isHidden

        this.setState({
            isHidden: !isHidden
        })

        
    }




    render() {
        const {isHidden}= this.state

        return (
            <div className="Messages">
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <MessageList ToggleHidden= {this.ToggleHidden}/>
                        </div>

                        <div className="expandChat-container col-8">
                            
                            {isHidden? <ComposeMsg/>: <ExpandChat/>}
                            <SendMsg/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Messages;