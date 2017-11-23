import React, { Component } from 'react'
import FlexDiv from '../FlexDiv'
import TimerClock from '../TimerClock'
import Button from '../Button'
import PropTypes from 'prop-types'

const TimerButton = Button.extend`
  font-size: 2em;
  padding: 0.25em 2em;
  margin:0 10px 10px 10px;
`

export default class Timer extends Component{
  
  static propTypes = {
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    resetTimer: PropTypes.func.isRequired,
    updateTimer: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.active) this.timeout = setTimeout(this.updateTimer, 1000)
  }

  updateTimer = () => {
    this.props.updateTimer(new Date())
  }

  handleClick = () => {
    if(this.props.active){
      clearTimeout(this.timeout)
      this.props.stopTimer()
    }else{
      this.props.startTimer(new Date())
    }
  }

  render(){

    const {active, minutes, seconds, resetTimer} = this.props

    const buttonBackground = active ? 'red' : "#05a905"

    const buttonText = active ? 'STOP' : 'START'

    return(
      <FlexDiv>
        <FlexDiv>
          <TimerClock minutes={minutes} seconds={seconds} />
        </FlexDiv>
        <FlexDiv>
          <TimerButton background={buttonBackground} onClick={this.handleClick}>
            {buttonText}
          </TimerButton>
          <TimerButton background="#a7a6a6" onClick={resetTimer}>
            RESET
          </TimerButton>
        </FlexDiv>
      </FlexDiv>
    )
  }

}