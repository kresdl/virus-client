import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';

const store = createStore(combineReducers(reducer));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
