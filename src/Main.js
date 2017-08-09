import React, { Component } from 'react';
import './App.css';

class Main extends Component{

  render(){

    let mainClass = this.props.isOpen ? "main open" : "main"

    return(
      <main className={mainClass} onClick={this.props.onClick}>
        <div className="componentContainer">
          <h2>App stuff goes in here</h2>
        </div>
      </main>
    )
  }

}

export default Main;