import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TimerScene from './Scenes/Timer/TimerScene.js';
import Home from './Scenes/Home.js';

class Main extends Component{

  render(){

    let mainClass = this.props.isOpen ? "main open" : "main"

      return(
        <main className={mainClass} onClick={this.props.onClick}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/timer' component={TimerScene} />
          </Switch>
        </main>
      )
    }
  }

export default Main;