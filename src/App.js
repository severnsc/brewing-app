import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Page from './Components/Page.js';

class App extends Component {

  render(){
    return(
      <Page />
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