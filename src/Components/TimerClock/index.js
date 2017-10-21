import React from 'react'
import PropTypes from 'prop-types'

TimerClock.PropTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number
}

TimerClock.defaultProps = {
  minutes: 0,
  seconds: 0
}

function TimerClock(props) {

    const style = {fontSize: "8em"}

    let seconds = props.seconds

    if(props.seconds < 10){
      seconds = "0" + props.seconds
    }

    return(
      <h2 style={style}>{props.minutes} : {seconds}</h2>
    )

}

export default TimerClock