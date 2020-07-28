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
import ToastMsg from './Partials/ToastMsg';

import socket from 'socket.io-client';
import axios from 'axios';
import {handleSocketEvents} from './socket/socketEvents';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let io;

class App extends Component{
   constructor(props){
      super(props);

      io = socket('http://localhost:5000');

      handleSocketEvents(io, this.props.colorNavbar)
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
            <button onClick = {() => toast.info(<ToastMsg/>, {
               position: toast.POSITION_TOP_RIGHT,
               draggable:false
            })}>HELLO</button>

            { /*If ID required for route, show Navbar*/}
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
    }
}

export {io};

export default connect(mapStateToProps, mapDispatchToProps)(App);