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
      alerts:[],
      errorText: "",
    }
    this.calculateTime = this.calculateTime.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createAlert = this.createAlert.bind(this)
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

  createAlert(minutes, seconds, desc){
    if(isNaN(parseInt(minutes))){
      this.setState({errorText: "Alert minutes must be an integer"})
    }else if(parseInt(minutes) > parseInt(this.state.minutes)){
      this.setState({errorText: "Alert minutes cannot be greater than timer's minutes"})
    }else if(parseInt(minutes) < 0){
      this.setState({errorText: "Alert minutes cannot be negative"})
    }else if(isNaN(parseInt(seconds))){
      this.setState({errorText: "Alert seconds must be an integer"})
    }else if(parseInt(seconds) > 59){
      this.setState({errorText: "Alert seconds cannot be larger than 59"})
    }else if(parseInt(seconds) < 0){
      this.setState({errorText: "Alert seconds cannot be negative"})
    }else if((minutes * 60000) + (seconds * 1000) > this.state.time){
      this.setState({errorText: "Alert time trigger cannot be larger than the total timer duration"})
    }else{
      const alert = {minutes: minutes, seconds: seconds, description: desc}
      this.state.alerts.push(alert)
      this.setState({
        alerts: this.state.alerts,
        errorText: ""
      })
    }
  }

  render(){

    let timerButtonClass = this.state.intervalID ? "stop" : "start"

    let timerButtonText = "Start"

    let alertComponents = this.state.alerts.map((a) => {
      return(
        <div key={a.description}>
          <span>{a.minutes} : {a.seconds}</span>
          <span>{a.description}</span>
        </div>
      )
    })
    
    if(this.state.intervalID){
      timerButtonText = "Stop"
    }

    if(this.state.time !== null){
      return(
        <div>
          <div className="componentContainer">
            <h2 className="timeText">{this.state.minutes} : {this.state.seconds}</h2>
            <button className={timerButtonClass} onClick={() => this.toggleTimer()}>{timerButtonText}</button>
            <button className={timerButtonClass} onClick={() => this.resetTimer()}>Reset</button>
          </div>
          <div className="componentContainer">
            {this.state.errorText}
            <Alert createAlert={this.createAlert} />
            {alertComponents}
          </div>
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