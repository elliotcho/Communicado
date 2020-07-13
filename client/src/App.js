import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Settings from './Pages/Settings/Settings';
import Friends from './Pages/Friends/Friends.jsx';
import Notifications from './Pages/Notifications/Notifications.jsx';
import Messages from './Pages/Messages/Messages'

class App extends Component{
    render(){
      const {uid} = this.props;

      return(
         <BrowserRouter>
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
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(App);