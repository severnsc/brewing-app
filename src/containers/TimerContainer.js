import { connect } from 'react-redux'

import {
  toggleTimer,
  resetTimer
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
    toggleTimer: () => {
      dispatch(toggleTimer())
    },
    resetTimer: () => {
      dispatch(resetTimer())
    }
  }
}

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

export default TimerContainer