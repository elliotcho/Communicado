import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Settings from './Pages/Settings/Settings';

class App extends Component{
    render(){
      return(
         <HashRouter>
           <Switch>
              <Route exact path='/' component={Login}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/home' component={Home}/>
              <Route path='/settings' component = {Settings}/>
           </Switch>
         </HashRouter>
      )
    }
}

export default App;
