import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TimerScene from './Scenes/Timer/TimerScene.js';
import Home from './Scenes/Home.js';
import PropTypes from 'prop-types'

Main.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

function Main(props) {

  let mainClass = props.isOpen ? "main open" : "main"

  return(
    <main className={mainClass} onClick={props.onClick}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/timer' component={TimerScene} />
      </Switch>
    </main>
  )
}

export default Main;