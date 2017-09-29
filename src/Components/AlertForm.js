import React, { Component } from 'react';
import '../App.css';

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

  isMinutesInteger(minutes){
    return isNaN(minutes) ? false : true
  }

  isMinutesPositive(minutes){
    return minutes < 0 ? false : true
  }

  isMinutesUnderMax(minutes){
    return minutes > this.props.maxMinutes ? false : true
  }

  isSecondsInteger(seconds){
    return isNaN(seconds) ? false : true
  }

  isSecondsPositive(seconds){
    return seconds < 0 ? false : true
  }

  isSecondsUnderMax(seconds){
    return seconds > 59 ? false : true
  }

  isTimeUnderMax(minutes, seconds){
    if((minutes * 60000) + (seconds * 1000) > this.props.maxTime){
      return false
    }else{
      return true
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    let valid = true
    let errorText
    e.preventDefault()
    if(!this.isMinutesInteger(this.state.minutes)){
      valid = false
      errorText = "Alert minutes must be an integer"
    }
    if(!this.isMinutesPositive(this.state.minutes)){
      valid = false
      errorText = "Alert minutes cannot be negative"
    }
    if(!this.isMinutesUnderMax(this.state.minutes)){
      valid = false
      errorText = "Alert minutes cannot be negative"
    }
    if(!this.isSecondsInteger(this.state.seconds)){
      valid = false
      errorText = "Alert seconds must be an integer"
    }
    if(!this.isSecondsPositive(this.state.seconds)){
      valid = false
      errorText = "Alert seconds cannot be negative"
    }
    if(!this.isSecondsUnderMax(this.state.seconds)){
      valid = false
      errorText = "Alert seconds cannot be larger than 59"
    }
    if(!this.isTimeUnderMax(this.state.minutes, this.state.seconds)){
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