import React, { Component } from 'react';
import '../../App.css';
import TimerForm from './Components/TimerComponents/TimerForm.js';
import Timer from './Components/TimerComponents/Timer.js';
import AlertsContainer from './Components/AlertComponents/AlertsContainer/AlertsContainer.js';
import AlertRow from './Components/AlertComponents/AlertRow.js';
import AlertEditForm from './Components/AlertComponents/AlertEditForm.js';
import {toTimeString,
        totalSeconds, 
        formatSeconds, 
        calculateMinutesFromMs, 
        calculateSecondsFromMs} from '../../utils/Time.js';
import '../../utils/Helpers.js';

class TimerScene extends Component{

  constructor(props){
    super(props);
    this.state = {
      minutes: 0,
      alerts:[],
      triggeredAlerts: [],
      errorText: "",
      editing: null,
      editingIndex: null,
    }
    this.processAlerts = this.processAlerts.bind(this)
    this.processIntervalOperations = this.processIntervalOperations.bind(this)
    this.timerFormSubmit = this.timerFormSubmit.bind(this)
    this.createAlert = this.createAlert.bind(this)
    this.deleteAlert = this.deleteAlert.bind(this)
    this.editAlert = this.editAlert.bind(this)
    this.updateAlert = this.updateAlert.bind(this)
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
  }

  timerFormSubmit(minutes){
    return (e) => {
      e.preventDefault()
      this.setState({minutes: minutes})
    }
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
          <Timer
            minutes={this.state.minutes}
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

export default TimerScene;