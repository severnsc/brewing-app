import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="flex-container">
        <header className="header">
          <h2>App Name</h2>
        </header>
        <main className="main">
          <h2>App</h2>
        </main>
        <nav className="nav">
          <ul>
            <li><p>Inventory</p></li>
            <li><p>Timer</p></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;
