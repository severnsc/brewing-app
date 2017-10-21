import React, { Component } from 'react';
import '../../App.css';
import TimerForm from './Components/TimerComponents/TimerForm.js';
import Timer from './Components/TimerComponents/Timer.js';

class TimerScene extends Component{

  constructor(props){
    super(props);
    this.state = {
      minutes: null,
    }
    this.timerFormSubmit = this.timerFormSubmit.bind(this)
  }

  timerFormSubmit(minutes){
    return (e) => {
      e.preventDefault()
      this.setState({minutes: parseInt(minutes, 10)})
    }
  }

  render(){

    if(this.state.minutes === null){
      return(
        <TimerForm handleSubmit={this.timerFormSubmit} />
      )
    }else{
      return(
        <Timer minutes={this.state.minutes} />
      )
    } 
  }
}

export default TimerScene;