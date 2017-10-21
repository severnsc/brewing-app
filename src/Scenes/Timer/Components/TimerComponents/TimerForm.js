import React, { Component } from 'react';
import Button from '../../../../Components/Button/index.js'
import ErrorText from '../../../../Components/ErrorText/index.js'
import './Timer.css'
import '../../../../App.css';

class TimerForm extends Component{

  state = {
    minutes: '',
    errorText: ''
  }

  handleChange = (e) => {
    this.setState({minutes: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.validateMinutes(this.state.minutes) && this.props.handleSubmit(this.state.minutes)
  }

  validateMinutes = (minutes) => {
    if(isNaN(parseInt(minutes, 10))){
      const errorText = "You must submit a number!"
      this.setState({errorText})
      return false
    }else{
      return true
    }
  }

  render(){
    return(
      <div className="componentContainer">
        <ErrorText text={this.state.errorText} />
        <h1>Create a New Timer</h1>
        <form onSubmit={this.handleSubmit} id="timerForm">
          <div id="inputContainer">
            <input type="text" value={this.state.minutes} id="minutesInput" onChange={this.handleChange} /><span id="minutes">minutes</span>
          </div>
          <div id="submitContainer">
            <Button buttonText="Create Timer" type="submit" id="timerSubmit" backgroundColor="#05a905" />
          </div>
        </form>
      </div>
    )
  }
}

export default TimerForm;