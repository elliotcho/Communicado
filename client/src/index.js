import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider as AlertProvider} from 'react-alert';
import Alert from './Partials/Alert';

import rootReducer from './store/reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

// Create central store of data for client
const store=createStore(rootReducer, applyMiddleware(thunk));

const AlertTemplate = ({style, options, message, close}) =>(
    <Alert
      style = {style}
      options = {options}
      message = {message}
      close = {close}
    />
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <AlertProvider template={AlertTemplate}>
        <App/>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();