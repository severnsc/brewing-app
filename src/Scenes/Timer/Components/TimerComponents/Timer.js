import React, { Component } from 'react';
import Button from '../../../../Components/Button'
import FlexDiv from '../../../../Components/FlexDiv'
import ComponentContainer from '../../../../Components/ComponentContainer'
import TimerClock from '../../../../Components/TimerClock'
import PropTypes from 'prop-types'
import '../../../../App.css';

const TimerButton = Button.extend`
  font-size: 2em;
  padding: 0.25em 2em;
  margin:0 10px 10px 10px;
`

export default class Timer extends Component{

  startButtonGreen = "#05a905"

  static propTypes = {
    minutes: PropTypes.number,
    seconds: PropTypes.number
  }

  static defaultProps = {
    minutes: 0,
    seconds: 0
  }

  state = {
    minutes: this.props.minutes,
    seconds: this.props.seconds,
    buttonText: "START",
    backgroundColor: this.startButtonGreen
  }

  timerDuration = (this.props.minutes * 60000) + (this.props.seconds * 1000)
  intervalID = null
  initialTime = null

  decrementTimer = () => {
    const newTime = this.timerDuration - (new Date() - this.initialTime)
    const newMinutes = Math.floor(newTime / 60000)
    const newSeconds = Math.floor(newTime / 1000) % 60
    if(newMinutes === 0 && newSeconds === 0){
      this.stopTimer()
    }else{
      this.setState({
        minutes: newMinutes,
        seconds: newSeconds
      })
    }
  }

  resetTimer = () => {
    this.initialTime = new Date()
    this.setState({
      seconds: this.props.seconds,
      minutes: this.props.minutes
    })
  }

  startTimer = () => {
    this.initialTime = new Date()
    this.intervalID = setInterval(this.decrementTimer, 1000)
    this.setState({
      buttonText: "STOP",
      backgroundColor: "red",
    });
  }

  stopTimer = () => {
    clearInterval(this.intervalID)
    this.intervalID = null
    this.setState({
      buttonText: 'START',
      backgroundColor: this.startButtonGreen
    });
  }

  toggleTimer = () => {
    if(this.intervalID){
      this.stopTimer()
    }else{
      if(this.state.minutes > 0 || this.state.seconds > 0){
        this.startTimer()
      }
    }
  }

  render(){
    return(
      <ComponentContainer>
        <TimerClock minutes={this.state.minutes} seconds={this.state.seconds} />
        <FlexDiv>
          <TimerButton background={this.state.backgroundColor} onClick={this.toggleTimer}>
            {this.state.buttonText}
          </TimerButton>
          <TimerButton background="#a7a6a6" onClick={this.resetTimer}>
            RESET
          </TimerButton>
        </FlexDiv>
      </ComponentContainer>
    )
  }
}