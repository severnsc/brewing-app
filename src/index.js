import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import brewingApp from './reducers'
import App from './App'
import './index.css'

let store = createStore(brewingApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)