import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../App.css';
import Timer from './Timer.js';
import Home from './Home.js';

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
      time: null,
      redirect: false,
    }
    this.setTime = this.setTime.bind(this)
  }

  setTime(ms){
    this.setState({
      time: ms,
      redirect: true,
    })
  }

  render(){

    if(this.state.redirect){
      return(
        <Timer time={this.state.time} />
      )
    }

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