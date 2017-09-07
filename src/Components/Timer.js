import React, { Component } from 'react';
import '../App.css';
import Alert from './Alert.js';

const toTime = (minutes, seconds) => {
  return `${minutes}:${seconds}`
}

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
      triggeredAlerts: [],
      errorText: "",
      editing: null,
      editingIndex: null,
    }
    this.calculateTime = this.calculateTime.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createAlert = this.createAlert.bind(this)
    this.updateAlert = this.updateAlert.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  startTimer(){
    let intervalID = setInterval(this.calculateTime, 1000)
    this.setState({intervalID: intervalID});
  }

  stopTimer(){
    clearInterval(this.state.intervalID);
    this.setState({
      intervalID: null,
    });
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
    let triggeredAlerts = this.state.triggeredAlerts
    const alerts = triggeredAlerts.concat(this.state.alerts)
    triggeredAlerts = []
    this.setState({
      time: this.state.initialTime,
      alerts: alerts,
      triggeredAlerts: triggeredAlerts
    }, this.initializeTimer)
  }

  timerEnd(){
    if(this.state.time === 0){
      this.stopTimer();
    }
  }

  calculateTime(){
    let triggeredAlerts = this.state.triggeredAlerts
    const minutes = Math.floor(this.state.time / 60000);
    let seconds = (this.state.time % 60000) / 1000;
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    let alerts = this.state.alerts
    const alertsToPush = alerts.filter((a) => {
      return toTime(a.minutes, a.seconds) === toTime(minutes, seconds)
    })
    alerts.splice(0, alertsToPush.length)
    triggeredAlerts = triggeredAlerts.concat(alertsToPush)
    this.setState({
      minutes: minutes,
      seconds: seconds,
      time: this.state.time - 1000,
      alerts: alerts,
      triggeredAlerts: triggeredAlerts
    }, this.timerEnd())
  }

  initializeTimer(){
    const minutes = Math.floor(this.state.time / 60000);
    let seconds = (this.state.time % 60000) / 1000;
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    this.setState({
      minutes: minutes,
      seconds: seconds
    })
  }

  componentDidMount(){
    if(this.state.time !== null){
      this.initializeTimer()
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const ms = this.refs.minutes.value * 60000
    this.setState({
      time: ms,
      initialTime: ms,
    }, this.initializeTimer)
  }

  createAlert(minutes, seconds, desc){
    if(isNaN(parseInt(minutes, 10))){
      this.setState({errorText: "Alert minutes must be an integer"})
    }else if(parseInt(minutes, 10) > parseInt(this.state.minutes, 10)){
      this.setState({errorText: "Alert minutes cannot be greater than timer's minutes"})
    }else if(parseInt(minutes, 10) < 0){
      this.setState({errorText: "Alert minutes cannot be negative"})
    }else if(isNaN(parseInt(seconds, 10))){
      this.setState({errorText: "Alert seconds must be an integer"})
    }else if(parseInt(seconds, 10) > 59){
      this.setState({errorText: "Alert seconds cannot be larger than 59"})
    }else if(parseInt(seconds, 10) < 0){
      this.setState({errorText: "Alert seconds cannot be negative"})
    }else if((parseInt(minutes, 10) * 60000) + (parseInt(seconds, 10) * 1000) > this.state.time){
      this.setState({errorText: "Alert time cannot be larger than the total timer duration"})
    }else{
      let alert = {
        minutes: parseInt(minutes, 10), 
        seconds: parseInt(seconds, 10), 
        description: desc
      }
      if(alert.seconds < 10){
        alert.seconds = "0" + alert.seconds
      }
      let alerts = this.state.alerts
      alerts.push(alert)
      alerts.sort((a, b) => {
        const totalSeconds = (minutes, seconds) => {
          return (minutes * 60) + parseInt(seconds, 10)
        }
        if(totalSeconds(a.minutes, a.seconds) < totalSeconds(b.minutes, b.seconds)){
          return 1
        }
        if(totalSeconds(a.minutes, a.seconds) > totalSeconds(b.minutes, b.seconds)){
          return -1
        }
        return 0
      })
      this.setState({
        alerts: alerts,
        errorText: ""
      })
    }
  }

  deleteAlert(index){
    this.state.alerts.splice(index, 1)
    this.setState({alerts: this.state.alerts})
  }

  editAlert(alert, index){
    this.setState({
      editing: alert,
      editingIndex: index
    })
  }

  updateAlert(e){
    e.preventDefault()
    if(isNaN(parseInt(this.state.editing.minutes, 10))){
      this.setState({errorText: "Alert minutes must be an integer"})
    }else if(parseInt(this.state.editing.minutes, 10) > parseInt(this.state.minutes, 10)){
      this.setState({errorText: "Alert minutes cannot be greater than timer's minutes"})
    }else if(parseInt(this.state.editing.minutes, 10) < 0){
      this.setState({errorText: "Alert minutes cannot be negative"})
    }else if(isNaN(parseInt(this.state.editing.seconds, 10))){
      this.setState({errorText: "Alert seconds must be an integer"})
    }else if(parseInt(this.state.editing.seconds, 10) > 59){
      this.setState({errorText: "Alert seconds cannot be larger than 59"})
    }else if(parseInt(this.state.editing.seconds, 10) < 0){
      this.setState({errorText: "Alert seconds cannot be negative"})
    }else if((parseInt(this.state.editing.minutes, 10) * 60000) + (parseInt(this.state.editing.seconds, 10) * 1000) > this.state.time){
      this.setState({errorText: "Alert time trigger cannot be larger than the total timer duration"})
    }else{
      let alerts = this.state.alerts
      alerts.splice(this.state.editingIndex, 1, this.state.editing)
      alerts.sort((a, b) => {
        const totalSeconds = (minutes, seconds) => {
          return (minutes * 60) + seconds
        }
        if(totalSeconds(a.minutes, a.seconds) < totalSeconds(b.minutes, b.seconds)){
          return 1
        }
        if(totalSeconds(a.minutes, a.seconds) > totalSeconds(b.minutes, b.seconds)){
          return -1
        }
        return 0
      })
      this.setState({
        alerts: alerts,
        errorText: "",
        editing: null
      })
    }
  }

  handleChange(e){
    const editing = this.state.editing
    const propertyName = e.target.name
    if(propertyName === "description"){
      editing[propertyName] = e.target.value      
    }else{
      editing[propertyName] = parseInt(e.target.value, 10)
    }
    this.setState({editing: editing})
  }

  render(){

    let timerButtonClass = this.state.intervalID ? "stop" : "start"

    let timerButtonText = "Start"

    let alertComponents = this.state.alerts.map((a, index) => {
      if(this.state.editing === null || index !== this.state.editingIndex){
        return(
          <div key={index}>
            <span>{a.minutes} : {a.seconds}</span>
            <span>{a.description}</span>
            <button onClick={() => this.deleteAlert(index)}>Delete</button>
            <button onClick={() => this.editAlert(a, index)}>Edit</button>
          </div>
        )
      }else{
        return(
          <div key={index}>
            {this.state.errorText}
            <form onSubmit={this.updateAlert}>
              <input type="text" name="minutes" value={this.state.editing.minutes} onChange={this.handleChange} />
              :
              <input type="text" name="seconds" value={this.state.editing.seconds} onChange={this.handleChange} />
              <input type="text" name="description" value={this.state.editing.description} onChange={this.handleChange} />
              <input type="submit" value="Update" />
            </form>
          </div>
        )
      }
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
          <h1>Create a New Timer</h1>
          <form onSubmit={this.handleSubmit} id="timerForm">
            <div id="inputContainer">
              <input type="text" ref="minutes" id="minutesInput" /><span id="minutes">minutes</span>
            </div>
            <div id="submitContainer">
              <button type="submit" value="Create Timer" id="timerSubmit">
                Create Timer
              </button>
            </div>
          </form>
        </div>
      )
    } 
  }
}

export default Timer;