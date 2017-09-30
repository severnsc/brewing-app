import React, { Component } from 'react';
import '../App.css';
import TimerForm from './Timer/TimerForm.js';
import TimerContainer from './Timer/TimerContainer.js';
import AlertsContainer from './Alerts/AlertsContainer.js';
import AlertRow from './Alerts/AlertRow.js';
import AlertEditForm from './Alerts/AlertEditForm.js';
import {toTime, totalSeconds, formatSeconds} from '../lib/Time.js';

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
    this.timerFormSubmit = this.timerFormSubmit.bind(this)
    this.createAlert = this.createAlert.bind(this)
    this.updateAlert = this.updateAlert.bind(this)
    this.toggleTimer = this.toggleTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.createAlert = this.createAlert.bind(this)
    this.deleteAlert = this.deleteAlert.bind(this)
    this.editAlert = this.editAlert.bind(this)
    this.updateAlert = this.updateAlert.bind(this)
  }

  componentDidMount(){
    if(this.state.time !== null){
      this.initializeTimer()
    }
  }

  calculateTime(){
    let time = this.state.time
    if(time === this.state.initialTime){
      time -= 1000
    }
    const minutes = Math.floor(time / 60000);
    let seconds = (time % 60000) / 1000;
    seconds = formatSeconds(seconds)
    let alerts = this.state.alerts
    const firedAlerts = alerts.filter((a) => {
      return toTime(a.minutes, a.seconds) === toTime(minutes, seconds)
    })
    alerts.splice(0, firedAlerts.length)
    let triggeredAlerts = this.state.triggeredAlerts
    triggeredAlerts = triggeredAlerts.concat(firedAlerts)
    this.setState({
      minutes: minutes,
      seconds: seconds,
      time: time - 1000,
      alerts: alerts,
      triggeredAlerts: triggeredAlerts
    }, this.timerEnd())
  }

  createAlert(minutes, seconds, desc){
    let alert = {
      minutes: minutes, 
      seconds: seconds, 
      description: desc
    }
    alert.seconds = formatSeconds(alert.seconds)
    let alerts = this.state.alerts
    alerts.push(alert)
    alerts = this.sortAlerts(alerts)
    this.setState({
      alerts: alerts,
      errorText: ""
    })
  }

  deleteAlert(index){
    let alerts = this.state.alerts
    alerts.splice(index, 1)
    this.setState({alerts: alerts})
  }

  editAlert(alert, index){
    this.setState({
      editing: alert,
      editingIndex: index
    })
  }

  timerFormSubmit(minutes){
    return (e) => {
      e.preventDefault()
      const ms = minutes * 60000
      this.setState({
        time: ms,
        initialTime: ms,
      }, this.initializeTimer)
    }
  }

  initializeTimer(){
    const minutes = Math.floor(this.state.time / 60000);
    let seconds = (this.state.time % 60000) / 1000;
    seconds = formatSeconds(seconds)
    this.setState({
      minutes: minutes,
      seconds: seconds
    })
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

  sortAlerts(alerts){
    return alerts.sort((a, b) => {
      if(totalSeconds(a.minutes, parseInt(a.seconds, 10)) < totalSeconds(b.minutes, parseInt(b.seconds, 10))){
        return 1
      }
      if(totalSeconds(a.minutes, parseInt(a.seconds, 10)) > totalSeconds(b.minutes, parseInt(b.seconds, 10))){
        return -1
      }
      return 0
    })
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

  timerEnd(){
    if(this.state.time === 0){
      this.stopTimer();
    }
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

  updateAlert(minutes, seconds, desc){
    let alert = {
      minutes: minutes, 
      seconds: seconds, 
      description: desc
    }
    alert.seconds = formatSeconds(alert.seconds)
    let alerts = this.state.alerts
    alerts.splice(this.state.editingIndex, 1, alert)
    alerts = this.sortAlerts(alerts)
    this.setState({
      alerts: alerts,
      errorText: "",
      editing: null
    })
  }

  render(){

    let timerButtonClass = this.state.intervalID ? "stop" : "start"

    let timerButtonText = "START"

    let alertComponents = this.state.alerts.map((a, index) => {
      if(this.state.editing === null || index !== this.state.editingIndex){
        return(
          <AlertRow 
            index={index}
            minutes={a.minutes}
            seconds={a.seconds}
            description={a.description}
            alert={a}
            deleteAlert={this.deleteAlert}
            editAlert={this.editAlert}
          />
        )
      }else{
        return(
          <AlertEditForm 
            index={index}
            errorText={this.state.errorText}
            updateAlert={this.updateAlert}
            minutes={this.state.editing.minutes}
            seconds={this.state.editing.seconds}
            description={this.state.editing.description}
            maxTime={parseInt(this.state.time, 10)}
            maxMinutes={parseInt(this.state.minutes, 10)}
          />
        )
      }
    })
    
    if(this.state.intervalID){
      timerButtonText = "STOP"
    }

    if(this.state.time !== null){
      return(
        <div>
          <TimerContainer
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            buttonClass={timerButtonClass}
            buttonText={timerButtonText}
            toggleTimer={this.toggleTimer}
            resetTimer={this.resetTimer}
          />
          <AlertsContainer
            errorText={this.state.errorText}
            alertComponents={alertComponents}
            createAlert={this.createAlert}
            timerMinutes={parseInt(this.state.minutes, 10)}
            timerTime={parseInt(this.state.time, 10)}
          />
        </div>
      )
    }else{
      return(
        <TimerForm handleSubmit={this.timerFormSubmit} />
      )
    } 
  }
}

export default Timer;