import React from 'react'
import TimerFormContainer from '../../containers/TimerFormContainer'
import TimerContainer from '../../containers/TimerContainer'
import AlertsContainer from '../../containers/AlertsContainer'
import PropTypes from 'prop-types'
import ShadowBox from '../../Components/ShadowBox'
import FlexDiv from '../../Components/FlexDiv'

const TimerScene = ({timerExists}) => {

  if(timerExists){
    return(
      <FlexDiv style={{marginTop: 50 + "px"}}>  
        <ShadowBox>
          <TimerContainer />
        </ShadowBox>
        <ShadowBox style={{
          marginTop: 20 + "px",
          width: 100+ '%',
          boxSizing: "border-box"
        }}>
          <AlertsContainer />
        </ShadowBox>
      </FlexDiv>
    )
  }else{
    return(
      <ShadowBox style={{marginTop: 50 + "px"}}>
        <TimerFormContainer />
      </ShadowBox>
    )
  }

}

TimerScene.propTypes = {
  timerExists: PropTypes.bool.isRequired
}

export default TimerScene