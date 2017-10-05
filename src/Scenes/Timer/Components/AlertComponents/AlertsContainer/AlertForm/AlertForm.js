import React, { Component } from 'react';
import * as alertlib from '../../../../../../utils/Alert.js';
import '../../Alerts.css';

class AlertForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      minutes: "00",
      seconds: "00",
      description: "",
      errorText: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    let valid = true
    let errorText
    if(!alertlib.isMinutesInteger(this.state.minutes)){
      valid = false
      errorText = "Alert minutes must be an integer"
    }
    if(!alertlib.isMinutesPositive(this.state.minutes)){
      valid = false
      errorText = "Alert minutes cannot be negative"
    }
    if(!alertlib.isMinutesUnderMax(this.state.minutes, this.props.maxMinutes)){
      valid = false
      errorText = "Alert minutes cannot be negative"
    }
    if(!alertlib.isSecondsInteger(this.state.seconds)){
      valid = false
      errorText = "Alert seconds must be an integer"
    }
    if(!alertlib.isSecondsPositive(this.state.seconds)){
      valid = false
      errorText = "Alert seconds cannot be negative"
    }
    if(!alertlib.isSecondsUnderMax(this.state.seconds)){
      valid = false
      errorText = "Alert seconds cannot be larger than 59"
    }
    if(!alertlib.isTimeUnderMax(this.state.minutes, this.state.seconds, this.props.maxTime)){
      valid = false
      errorText = "Alert time cannot be larger than the total timer duration"
    }
    if(valid){
      this.props.createAlert(parseInt(this.state.minutes, 10), parseInt(this.state.seconds, 10), this.state.description)
      errorText = ""
    }
    this.setState({
      minutes:"00",
      seconds:"00",
      description: "",
      errorText: errorText
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} id="alertForm">
        {this.state.errorText}
        <div>
          <label>Time to trigger alert</label>
          <input id="alertMinutes" type="text" name="minutes" value={this.state.minutes} onChange={this.handleChange} />
          :
          <input type="text" name="seconds" value={this.state.seconds} onChange={this.handleChange} />
        </div>
        <div id="alertContainer">
          <label>Alert description</label>
          <input id="alertDescription" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </div>
        <div>
          <input id="createAlertButton" type="submit" value="Create Alert" />
        </div>
      </form>
    )
  }

}

export default AlertForm;