import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="sidebar">
          <h2>Brewing App</h2>
          <ul className="appList">
            <li>Inventory</li>
            <li>Timer</li>
          </ul>
          <div className="profile">
            <h2>Current User</h2>
          </div>
        </div>
        <div className="main">
          <div className="header">
            <h2>App Name</h2>
          </div>
          <div className="body">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
