import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {colorNotif} from './store/actions/notificationsActions';
import {updateOnlineFriends} from './store/actions/friendsActions';

import {
   getRecipients,
   loadChats,
   handleNewMessage,
   handleIsTyping,
   handleStopTyping,
   getUnseenChats
} from './store/actions/messagesActions';

import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Settings from './Pages/Settings/Settings';
import Friends from './Pages/Friends/Friends.jsx';
import Notifications from './Pages/Notifications/Notifications.jsx';
import Navbar from './Partials/Navbar';
import Messages from './Pages/Messages/Messages'
import socket from 'socket.io-client';
import axios from 'axios';
import {handleSocketEvents} from './socket/socketEvents';
import {ToastContainer} from 'react-toastify';

let io;

class App extends Component{
   constructor(props){
      super(props);
      
      //io only instantiated once and we dont want override this cnonnection
      io = socket('http://localhost:5000');
      
      //importing all these socket.on events from server (socketEvents.js)
      handleSocketEvents(
         io, 
         props.colorNotif,
         props.updateOnlineFriends,
         props.getRecipients,
         props.loadChats,
         props.handleNewMessage,
         props.handleIsTyping,
         props.handleStopTyping
      );

      this.getUnreadNotifs = this.getUnreadNotifs.bind(this);
      this.getUnseenChats = this.getUnseenChats.bind(this);
   }

   async componentDidMount(){
      const {uid, colorNavbar} = this.props;

      if(uid){
         this.getUnreadNotifs(uid, colorNavbar);
         this.getUnseenChats();
      }
   }

   async componentDidUpdate(prevProps){
      const {uid, colorNavbar} = this.props;

      if(uid && prevProps.uid !== uid){
         this.getUnreadNotifs(uid, colorNavbar);
         this.getUnseenChats();
      }
   }

   async getUnreadNotifs(uid, colorNotif){
      const response = await axios.get(`http://localhost:5000/notifs/unread/${uid}`);
      const {unread} = response.data;

      if(unread){
         colorNotif();
      }
   }

   getUnseenChats(){
      const {uid, getUnseenChats} = this.props;
      getUnseenChats(uid);
   }

   render(){
      const {uid, newNotif} = this.props;

      if(this.props.uid){
         io.emit("JOIN_SERVER", {uid: this.props.uid});
      }
      
      return(
         <div>
            { /*If ID required for route, show Navbar*/}
            <BrowserRouter>   
               {uid? <Navbar newNotif = {newNotif}/>: null}

               <div>
                  <Switch>
                  {/* Router that switches paths based on route */}
                     <Route exact path='/' render = {()=> uid? <Home uid ={uid}/>: <Login uid ={uid}/>}/>
                     <Route path='/chat/:id' render={() => <Messages uid={uid}/>}/>
                     <Route path='/signup' render ={() => <Signup uid ={uid}/>}/>
                     <Route path='/settings' component = {Settings}/>
                     <Route path='/friends' component = {Friends}/>
                     <Route path='/notifications' component={Notifications}/>
                  </Switch>
               </div>
               
               <ToastContainer/>
            </BrowserRouter>
         </div>
      )
   }
}
// Convert state to props using reducer
const mapStateToProps = (state) =>{
    return {
        uid: state.auth.uid,
        newNotif: state.notifs.newNotif
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        colorNotif: () => {dispatch(colorNotif());},
        updateOnlineFriends: (friends) => {dispatch(updateOnlineFriends(friends));},
        getRecipients: (queryResults) => {dispatch(getRecipients(queryResults));},
        loadChats: (uid) => {dispatch(loadChats(uid));},
        handleIsTyping: (uid,chatId) =>{dispatch(handleIsTyping(uid,chatId));},
        handleStopTyping: (uid,chatId) =>{dispatch(handleStopTyping(uid,chatId));},
        handleNewMessage: (newMessage, chatId) => {dispatch(handleNewMessage(newMessage, chatId));},
        getUnseenChats: (uid) => {dispatch(getUnseenChats(uid));}
    }
}

export {io};

export default connect(mapStateToProps, mapDispatchToProps)(App);