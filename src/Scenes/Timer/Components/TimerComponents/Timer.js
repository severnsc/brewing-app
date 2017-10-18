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
      intervalID: null,
      minutes: this.props.minutes,
      seconds: this.props.seconds,
      buttonText: "START",
      backgroundColor: startButtonGreen
    }
    this.toggleTimer = this.toggleTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.decrementTimer = this.decrementTimer.bind(this)
  }

  decrementTimer(){
    if(this.state.minutes === 0 && this.state.seconds === 0){
      this.stopTimer()
    }else{
      if(this.state.seconds > 0){
        let newSeconds = this.state.seconds - 1
        this.setState({seconds: newSeconds})
      }else{
        let newSeconds = 59
        let newMinutes = this.state.minutes - 1
        this.setState({
          seconds: newSeconds,
          minutes: newMinutes
        })
      }
    }
  }

  resetTimer(){
    this.setState({
      seconds: this.props.seconds,
      minutes: this.props.minutes
    })
  }

  startTimer(){
    const intervalID = setInterval(this.decrementTimer, 1000)
    this.setState({
      intervalID: intervalID,
      buttonText: "STOP",
      backgroundColor: "red"
    });
  }

  stopTimer(){
    clearInterval(this.state.intervalID);
    this.setState({
      intervalID: null,
      buttonText: 'START',
      backgroundColor: startButtonGreen
    });
  }

  toggleTimer(){
    if(this.state.intervalID){
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