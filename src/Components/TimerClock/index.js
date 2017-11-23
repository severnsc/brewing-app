import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TimerClockText = styled.h2`
  font-size: 8em;
`

const TimerClock = ({minutes, seconds}) => {

  return(
    <TimerClockText>
      {minutes} : {seconds < 10 ? "0" + seconds : seconds}
    </TimerClockText>
  )

}

TimerClock.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
}

export default TimerClock