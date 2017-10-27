import React from 'react'
import PropTypes from 'prop-types'

const TimerClock = (props) => {

    const style = {fontSize: "8em"}

    let seconds = props.seconds

    if(props.seconds < 10){
      seconds = "0" + props.seconds
    }

    return(
      <h2 style={style}>{props.minutes} : {seconds}</h2>
    )

}

TimerClock.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
}

TimerClock.defaultProps = {
  minutes: 0,
  seconds: 0
}

export default TimerClock