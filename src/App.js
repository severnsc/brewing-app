import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="body">
        <header className="header">
          <div className="logo">
            <h2>Logo</h2>
          </div>
          <div className="appName">
            <h2>App Name</h2>
          </div>
        </header>
        <div className="flex-container">
          <main className="main">
            <h2>App</h2>
          </main>
          <nav className="nav">
            <ul>
              <li><p>Inventory</p></li>
              <li><p>Timer</p></li>
              <li><p>Current User</p></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default App;
