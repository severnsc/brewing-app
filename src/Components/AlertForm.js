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
    if(isNaN(minutes)){
      this.setState({errorText: "Alert minutes must be an integer"}, () => {return false})
    }
  }

  isMinutesPositive(minutes){
    if(minutes < 0){
      this.setState({errorText: "Alert minutes cannot be negative"}, () => {return false})
    }
  }

  isMinutesUnderMax(minutes){
    if(minutes > this.props.maxMinutes){
      this.setState({errorText: "Alert minutes cannot be greater than timer's minutes"}, () => {return false})
    }
  }

  isSecondsInteger(seconds){
    if(isNaN(seconds)){
      this.setState({errorText: "Alert seconds must be an integer"}, () => {return false})
    }
  }

  isSecondsPositive(seconds){
    if(seconds < 0){
      this.setState({errorText: "Alert seconds cannot be negative"}, () => {return false})
    }
  }

  isSecondsUnderMax(seconds){
    if(seconds > 59){
      this.setState({errorText: "Alert seconds cannot be larger than 59"}, () => {return false})
    }
  }

  isTimeUnderMax(minutes, seconds){
    if((minutes * 60000) + (seconds * 1000) > this.props.maxTime){
      this.setState({errorText: "Alert time cannot be larger than the total timer duration"}, () => {return false})
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    let valid = true
    e.preventDefault()
    valid = this.isMinutesInteger(parseInt(this.state.minutes, 10))
    valid = this.isMinutesPositive(parseInt(this.state.minutes, 10))
    valid = this.isMinutesUnderMax(parseInt(this.state.minutes, 10))
    valid = this.isSecondsInteger(parseInt(this.state.seconds, 10))
    valid = this.isSecondsPositive(parseInt(this.state.seconds, 10))
    valid = this.isSecondsUnderMax(parseInt(this.state.seconds, 10))
    valid = this.isTimeUnderMax(parseInt(this.state.minutes, 10), parseInt(this.state.seconds, 10))
    if(valid){
      this.props.createAlert(parseInt(this.state.minutes, 10), parseInt(this.state.seconds, 10), this.state.description)
    }
    this.setState({
      minutes:"00",
      seconds:"00",
      description: ""
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