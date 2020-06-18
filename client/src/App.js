import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';

class App extends Component{
    render(){
      return(
         <HashRouter>
           <Route exact path='/' component={Login}/>
           <Route exact path='/signup' component={Signup}/>
           <Route exact path='/home' component={Home}/>
         </HashRouter>
      )
    }
}

export default App;
