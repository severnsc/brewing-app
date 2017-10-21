import React, { Component } from 'react';
import Button from '../../../../Components/Button/index.js'
import Clock from '../../../../Components/Clock/index.js'
import './Timer.css';
import '../../../../App.css';

const startButtonGreen = "#05a905"

class Timer extends Component{

  constructor(props){
    super(props);
    this.state = {
      minutes: this.props.minutes,
      seconds: this.props.seconds,
      buttonText: "START",
      backgroundColor: startButtonGreen,
    }
    this.timerDuration = (this.props.minutes * 60000) + (this.props.seconds * 1000)
    this.intervalID = null
    this.initialTime = null
    this.toggleTimer = this.toggleTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.decrementTimer = this.decrementTimer.bind(this)
  }

  decrementTimer(){
    const newTime = this.timerDuration - (new Date() - this.initialTime)
    const newMinutes = Math.floor(newTime / 60000)
    const newSeconds = Math.floor(newTime / 1000) % 60
    if(newMinutes === 0 && newSeconds === 0){
      this.stopTimer()
    }else{
      this.setState({
        minutes: newMinutes,
        seconds: newSeconds
      })
    }
  }

  resetTimer(){
    this.setState({
      seconds: this.props.seconds,
      minutes: this.props.minutes
    })
  }

  startTimer(){
    this.initialTime = new Date()
    this.intervalID = setInterval(this.decrementTimer, 1000)
    this.setState({
      buttonText: "STOP",
      backgroundColor: "red",
    });
  }

  stopTimer(){
    clearInterval(this.intervalID)
    this.intervalID = null
    this.setState({
      buttonText: 'START',
      backgroundColor: startButtonGreen
    });
  }

  toggleTimer(){
    if(this.intervalID){
      this.stopTimer()
    }else{
      if(this.state.minutes > 0 || this.state.seconds > 0){
        this.startTimer()
      }
    }
  }

  render(){
    return(
      <div className="componentContainer" id="timerContainer">
        <Clock minutes={this.state.minutes} seconds={this.state.seconds} />
        <div id="timerButtonContainer">
          <Button backgroundColor={this.state.backgroundColor} onClick={this.toggleTimer} buttonText={this.state.buttonText} />
          <Button backgroundColor="#a7a6a6" onClick={this.resetTimer} buttonText="RESET" />
        </div>
      </div>
    )
  }
}

Timer.defaultProps = {
  minutes: 0,
  seconds: 0
}

export default Timer