import React, { Component } from 'react';
import '../App.css';
import Alert from './Alert.js';

class Timer extends Component{

  constructor(props){
    super(props);
    this.state = {
      initialTime: null,
      time: null,
      minutes: 0,
      seconds: 0,
      intervalID: null,
    }
    this.calculateTime = this.calculateTime.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      if(this.state.time > 0){
        this.startTimer()
      }
    }
  }

  resetTimer(){
    this.setState({time: this.state.initialTime}, this.calculateTime)
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
    if(this.state.time !== null){
      this.calculateTime()
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const ms = this.refs.minutes.value * 60000
    this.setState({
      time: ms,
      initialTime: ms,
    }, this.calculateTime)
  }

  render(){

    let timerButtonClass = this.state.intervalID ? "stop" : "start"

    let timerButtonText = "Start"
    
    if(this.state.intervalID){
      timerButtonText = "Stop"
    }

    if(this.state.time !== null){
      return(
        <div className="componentContainer">
          <h2 className="timeText">{this.state.minutes} : {this.state.seconds}</h2>
          <button className={timerButtonClass} onClick={() => this.toggleTimer()}>{timerButtonText}</button>
          <button className={timerButtonClass} onClick={() => this.resetTimer()}>Reset</button>
          <Alert />
        </div>
      )
    }else{
      return(
        <div className="componentContainer">
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref="minutes" /><span>minutes</span>
            <input type="submit" value="Create Timer" />
          </form>
        </div>
      )
    } 
  }
}

export default Timer;