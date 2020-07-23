import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {colorNavbar} from './store/actions/notificationsActions';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Settings from './Pages/Settings/Settings';
import Friends from './Pages/Friends/Friends.jsx';
import Notifications from './Pages/Notifications/Notifications.jsx';
import Navbar from './Partials/Navbar';
import Messages from './Pages/Messages/Messages'

import socket from 'socket.io-client';

let io;

class App extends Component{
   constructor(){
      super();

      io = socket('http://localhost:5000');

      io.on('FRIEND_REQUEST', data =>{
         alert(data.msg);
         this.props.colorNavbar();
      });
   }

   render(){
      const {uid, newNotif} = this.props;

      if(this.props.uid){
         io.emit("JOIN_SERVER", {uid: this.props.uid});
      }
      
      return(
         <BrowserRouter>
            {uid? <Navbar newNotif = {newNotif}/>: null}

           <Switch>
           {/* Router that switches paths based on route */}
              <Route exact path='/' render = {()=> uid? <Home uid ={uid}/>: <Login uid ={uid}/>}/>
              <Route path='/messages' component={Messages}/>
              <Route path='/signup' render ={() => <Signup uid ={uid}/>}/>
              <Route path='/settings' component = {Settings}/>
              <Route path='/friends' component = {Friends}/>
              <Route path='/notifications' component={Notifications}/>
           </Switch>
         </BrowserRouter>
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
        colorNavbar: () => {dispatch(colorNavbar());}  
    }
}

export {io};

export default connect(mapStateToProps, mapDispatchToProps)(App);