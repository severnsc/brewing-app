import React from 'react'
import PropTypes from 'prop-types'

TimerClock.PropTypes = {
  minutes: number,
  seconds: number
}

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

export default TimerClock