import React, { Component } from 'react';
import * as alertlib from '../lib/Alert.js';
import '../App.css';

class AlertEditForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      minutes: this.props.minutes,
      seconds: this.props.seconds,
      description: this.props.description,
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
      this.props.updateAlert(parseInt(this.state.minutes, 10), parseInt(this.state.seconds, 10), this.state.description)
      errorText = ""
    }
  }

  render(){
    return(
      <div key={this.props.index}>
        {this.props.errorText}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="minutes" value={this.state.minutes} onChange={this.handleChange} />
          :
          <input type="text" name="seconds" value={this.state.seconds} onChange={this.handleChange} />
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          <input type="submit" value="Update" />
        </form>
      </div>
    )
  }

}

export default AlertEditForm;