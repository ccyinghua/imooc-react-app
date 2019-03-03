import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import reducers from './reducer';
import './config.js'

// 新建store
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// 将store等传递给App组件
ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>空白页面</div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
