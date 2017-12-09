import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import brewingApp from './reducers'
import Body from './App'
import './index.css'

let store = createStore(brewingApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Provider store={store}>
    <Body />
  </Provider>,
  document.getElementById('root')
)