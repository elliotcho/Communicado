import React from 'react';
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

function App(props){
      const {uid, newNotif, colorNavbar} = props;

      const io = socket('http://localhost:5000');

      if(uid){
         io.emit("JOIN_SERVER", {uid});
      }

      io.on('FRIEND_REQUEST', data =>{
         alert(data.msg);
         colorNavbar();
      });

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

export default connect(mapStateToProps, mapDispatchToProps)(App);