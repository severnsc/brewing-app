import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import TimerSceneContainer from './containers/TimerSceneContainer'
import InventoryScene from './Scenes/InventoryScene'
import MaltInventoryScene from './Scenes/MaltInventoryScene'
import Home from './Scenes/Home.js'
import PropTypes from 'prop-types'

const Main = (props) => {

  let mainClass = props.isOpen ? "main open" : "main"

  return(
    <main className={mainClass} onClick={props.onClick}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/timer' component={TimerSceneContainer} />
        <Route exact path='/inventory' component={InventoryScene} />
        <Route path='/inventory/malt' component={MaltInventoryScene} />
      </Switch>
    </main>
  )
}

Main.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Main