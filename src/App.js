import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './Components/Wrapper.js';

function App(props) {
  return(
    <Wrapper />
  )
}

function Body(props) {
  return(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default Body;