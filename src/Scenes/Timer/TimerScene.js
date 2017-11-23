import React from 'react'
import TimerFormContainer from '../../containers/TimerFormContainer'
import TimerContainer from '../../containers/TimerContainer'
import AlertsContainer from '../../containers/AlertsContainer'
import PropTypes from 'prop-types'

const TimerScene = ({timerExists}) => {

  if(timerExists){
    return(
      <div>
        <TimerContainer />
        <AlertsContainer />
      </div>
    )
  }else{
    return <TimerFormContainer />
  }

}

TimerScene.propTypes = {
  timerExists: PropTypes.bool.isRequired
}

export default TimerScene