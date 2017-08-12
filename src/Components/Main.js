import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import Timer from './Timer.js';
import Home from './Home.js';

class Main extends Component{

  render(){

    let mainClass = this.props.isOpen ? "main open" : "main"

      return(
        <main className={mainClass} onClick={this.props.onClick}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/timer' component={Timer} />
          </Switch>
        </main>
      )
    }
  }

export default Main;