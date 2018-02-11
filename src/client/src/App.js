import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './Components/Wrapper.js';

const App = (props) => {
  return(
    <Wrapper />
  )
}

const Body = (props) => {
  return(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default Body;