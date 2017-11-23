import { connect } from 'react-redux'

import {
  startTimer,
  stopTimer,
  resetTimer,
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
      dispatch(startTimer(time))
    },
    stopTimer: () => {
      dispatch(stopTimer())
    },
    resetTimer: () => {
      dispatch(resetTimer())
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