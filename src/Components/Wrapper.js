import React, { Component } from 'react';
import '../App.css';
import Nav from './Nav.js';
import Main from '../Main.js'

export default class Wrapper extends Component{

  state = {sidebarOpen: false}

  handleTouch = () => {
    this.setState(prevState => ({sidebarOpen: !prevState.sidebarOpen}))
  }

  menuCollapse = () => {
    if(this.state.sidebarOpen){
      this.setState({sidebarOpen: false})
    }
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
          <Main isOpen={this.state.sidebarOpen} onClick={this.menuCollapse} />
          <Nav isOpen={this.state.sidebarOpen} onClick={this.menuCollapse} />
        </div>
      </div>
    );
  }
}