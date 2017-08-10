import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './Components/Wrapper.js';

class App extends Component {

  render(){
    return(
      <Wrapper />
    )
  }

}

class Body extends Component{

  render(){
    return(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }

}

export default Body;