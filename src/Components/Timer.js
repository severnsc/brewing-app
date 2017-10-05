import React, { Component } from 'react';
import '../App.css';
import TimerForm from './Timer/TimerForm.js';
import TimerContainer from './Timer/TimerContainer.js';
import AlertsContainer from './Alerts/AlertsContainer.js';
import AlertRow from './Alerts/AlertRow.js';
import AlertEditForm from './Alerts/AlertEditForm.js';
import {toTimeString,
        totalSeconds, 
        formatSeconds, 
        calculateMinutesFromMs, 
        calculateSecondsFromMs} from '../lib/Time.js';
import '../lib/Helpers.js';

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
    this.processAlerts = this.processAlerts.bind(this)
    this.processIntervalOperations = this.processIntervalOperations.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
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

  initializeTimer(){
    const minutes = Math.floor(this.state.time / 60000);
    let seconds = (this.state.time % 60000) / 1000;
    seconds = formatSeconds(seconds)
    this.setState({
      minutes: minutes,
      seconds: seconds
    })
  }

  processAlerts(){
    //Calculate the current minutes and seconds of the timer for the string comparison
    const timerMinutes = calculateMinutesFromMs(this.state.time)
    const timerSeconds = formatSeconds(calculateSecondsFromMs(this.state.time))
    
    //Don't alter state directly
    let alerts = this.state.alerts
    
    //Get an array of alerts whose trigger times match the current time
    const firedAlerts = alerts.filter((a) => {
      return toTimeString(a.minutes, a.seconds) === toTimeString(timerMinutes, timerSeconds)
    })

    //Send SMS alerts for each firedAlert
    firedAlerts.forEach((alert) => {
      fetch('/messages', {
        method: 'POST',
        body: JSON.stringify({message: alert.description}),
        headers: {'Content-Type': 'application/json'}
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    })

    //Remove the firedAlerts from the alerts queue
    alerts = alerts.filter((a) => {
      return firedAlerts.excludes(a)
    })

    //Don't alter state directly
    let triggeredAlerts = this.state.triggeredAlerts
    
    //Add the alerts that just fired to the triggeredAlerts history
    triggeredAlerts = triggeredAlerts.concat(firedAlerts)

    //Update the alerts and triggeredAlerts state
    this.setState({
      alerts: alerts,
      triggeredAlerts: triggeredAlerts
    })
  }

  processIntervalOperations(){
    this.processAlerts()
    this.updateTimer()
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

  resetTimer(){
    let triggeredAlerts = this.state.triggeredAlerts
    //Don't need to sort because alerts that have been triggered should go to the front of the alerts queue
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
    let time = this.state.time
    //This prevents the timer from lagging for 1 second when it first runs
    if(time === this.state.initialTime){
      time -= 1000
    }
    let intervalID = setInterval(this.processIntervalOperations, 1000)
    this.setState({
      intervalID: intervalID,
      time: time
    });
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

  updateTimer(){
    const minutes = calculateMinutesFromMs(this.state.time)
    const seconds = formatSeconds(calculateSecondsFromMs(this.state.time))
    this.setState({
      time: this.state.time - 1000,
      minutes: minutes,
      seconds: seconds
    }, this.timerEnd())
  }

  render(){

    let timerButtonClass = this.state.intervalID ? "stop" : "start"

    let timerButtonText

    if(this.state.intervalID){
      timerButtonText = "STOP"
    }else{
      timerButtonText = "START"
    }

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