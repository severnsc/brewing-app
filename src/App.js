import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.js';
import Main from './Main.js'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sidebarOpen: false,
    }
    this.handleTouch = this.handleTouch.bind(this)
  }

  handleTouch(){
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  }

  render() {

    let headerClass = this.state.sidebarOpen ? "header open" : "header"

    return (
      <div className="body">
        <header className={headerClass}>
          <div className="navIcon">
            <a onClick={this.handleTouch}>
              &#9776;
            </a>
            <h2 className="topElement">Stuff</h2>
          </div>
          <div className="appName">
            <h2>App Name</h2>
          </div>
        </header>
        <div className="flex-container">
          <Main isOpen={this.state.sidebarOpen} />
          <Nav isOpen={this.state.sidebarOpen} />
        </div>
      </div>
    );
  }
}

export default App;
