import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {colorNavbar} from './store/actions/notificationsActions';
import {updateOnlineFriends} from './store/actions/friendsActions';
import {getRecipients} from './store/actions/messagesActions';
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

      io = socket('http://localhost:5000');

      handleSocketEvents(
         io, 
         props.colorNavbar,
         props.updateOnlineFriends,
         props.getRecipients
      );
   }

   componentDidMount(){
      const {uid, colorNavbar} = this.props;

      if(uid !== null){
         axios.get(`http://localhost:5000/unreadnotifs/${uid}`).then(response=>{
            if(response.data.unread){
               colorNavbar();
            }
         });
      }
   }

   componentDidUpdate(prevProps){
      const {uid, colorNavbar} = this.props;

      if(prevProps.uid !== uid){
         axios.get(`http://localhost:5000/unreadnotifs/${uid}`).then(response=>{
            if(response.data.unread){
               colorNavbar();
            }
         });
      }
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
        colorNavbar: () => {dispatch(colorNavbar());},
        updateOnlineFriends: (friends) => {dispatch(updateOnlineFriends(friends));},
        getRecipients: (queryResults) => {dispatch(getRecipients(queryResults));}
    }
}

export {io};

export default connect(mapStateToProps, mapDispatchToProps)(App);