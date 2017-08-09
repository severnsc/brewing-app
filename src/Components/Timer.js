import React, { Component } from 'react';
import '../App.css';

class Timer extends Component{

  constructor(props){
    super(props);
    this.state = {
      time: this.props.time,
      minutes: 0,
      seconds: 0,
      intervalID: null,
    }
    this.calculateTime = this.calculateTime.bind(this)
  }

  startTimer(){
    this.setState({intervalID: setInterval(this.calculateTime, 1000)});
  }

  stopTimer(){
    clearInterval(this.state.intervalID);
    this.setState({intervalID: null});
  }

  toggleTimer(){
    if(this.state.intervalID){
      this.stopTimer()
    }else{
      if(this.state.time < 0){
        this.setState({time: this.props.time}, this.calculateTime)
      }else{
        this.startTimer()
      }
    }
  }

  timerEnd(){
    if(this.state.time === 0){
      this.stopTimer();
    }
  }

  calculateTime(){
    const minutes = Math.floor(this.state.time / 60000);
    let seconds = (this.state.time % 60000) / 1000;
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    this.setState({
      minutes: minutes,
      seconds: seconds,
      time: this.state.time - 1000,
    }, this.timerEnd())
  }

  componentDidMount(){
    this.calculateTime()
  }

  render(){

    let timerButtonClass = this.state.intervalID ? "stop" : "start"

    let timerButtonText = "Start"
    
    if(this.state.intervalID){
      timerButtonText = "Stop"
    }

    if(this.state.time < 0){
      timerButtonText = "Reset"
    }

    return(
      <div className="timerContainer">
        <h2 className="timeText">{this.state.minutes} : {this.state.seconds}</h2>
        <button className={timerButtonClass} onClick={() => this.toggleTimer()}>{timerButtonText}</button>
      </div>
    )
  }

}

export default Timer;