import React, { Component } from 'react';
import '../App.css';
import Timer from './Timer.js';

class Main extends Component{

  render(){

    let mainClass = this.props.isOpen ? "main open" : "main"

      return(
        <main className={mainClass} onClick={this.props.onClick}>
            <div className="componentContainer">
              <Timer time={5400000} />
            </div>
        </main>
      )
    }
  }

export default Main;