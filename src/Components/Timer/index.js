import React from 'react'
import FlexDiv from '../FlexDiv'
import TimerClock from '../TimerClock'
import Button from '../Button'
import PropTypes from 'prop-types'

const TimerButton = Button.extend`
  font-size: 2em;
  padding: 0.25em 2em;
  margin:0 10px 10px 10px;
`

const Timer = ({minutes, seconds, active, toggleTimer, resetTimer}) => {

  const buttonBackground = active ? 'red' : "#05a905"

  const buttonText = active ? 'STOP' : 'START'

  return(
    <FlexDiv>
      <FlexDiv>
        <TimerClock minutes={minutes} seconds={seconds} />
      </FlexDiv>
      <FlexDiv>
        <TimerButton background={buttonBackground} onClick={toggleTimer}>
          {buttonText}
        </TimerButton>
        <TimerButton background="#a7a6a6" onClick={resetTimer}>
          RESET
        </TimerButton>
      </FlexDiv>
    </FlexDiv>
  )

}

Timer.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  toggleTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired
}

export default Timer