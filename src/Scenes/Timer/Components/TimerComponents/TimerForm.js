import React, { Component } from 'react';
import Button from '../../../../Components/Button'
import ErrorText from '../../../../Components/ErrorText'
import ComponentContainer from '../../../../Components/ComponentContainer'
import PropTypes from 'prop-types'
import './Timer.css'
import '../../../../App.css';

export default class TimerForm extends Component{

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

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
      <ComponentContainer>
        <ErrorText text={this.state.errorText} />
        <h1>Create a New Timer</h1>
        <form onSubmit={this.handleSubmit} id="timerForm">
          <div id="inputContainer">
            <input type="text" value={this.state.minutes} id="minutesInput" onChange={this.handleChange} /><span id="minutes">minutes</span>
          </div>
          <div id="submitContainer">
            <Button type="submit" background="#05a905">
              Create Timer
            </Button>
          </div>
        </form>
      </ComponentContainer>
    )
  }
}