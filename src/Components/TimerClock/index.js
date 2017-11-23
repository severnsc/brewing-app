import styled from 'styled-components'
import PropTypes from 'prop-types'

const timerClock = styled.h2`
  font-size: 8em;
`

const TimerClock = ({minutes, seconds}) => {

  return(
    <timerClock>
      {minutes} : {seconds < 10 ? "0" + seconds : seconds}
    </timerClock>
  )

}

TimerClock.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
}

export default TimerClock