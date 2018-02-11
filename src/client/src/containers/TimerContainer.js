import { connect } from 'react-redux'

import {
  requestStartRemoteTimer,
  requestStopRemoteTimer,
  requestResetRemoteTimer,
  updateTimer
} from '../actions/actions'

import Timer from '../Components/Timer'

const mapStateToProps = state => {
  return {
    minutes: state.timer.minutes,
    seconds: state.timer.seconds,
    active: state.timer.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startTimer: time => {
      dispatch(requestStartRemoteTimer(time))
    },
    stopTimer: () => {
      dispatch(requestStopRemoteTimer())
    },
    resetTimer: () => {
      dispatch(requestResetRemoteTimer())
    },
    updateTimer: time => {
      dispatch(updateTimer(time))
    }
  }
}

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

export default TimerContainer