import { connect } from 'react-redux'

import {
  toggleTimer,
  resetTimer
} from '../actions'

import Timer from '../Components/EditableTable'

const mapStateToProps = state => {
  return {
    minutes: state.timer.minutes,
    seconds: state.timer.seconds,
    active: state.timer.active
  }
}

const mapDispatchToProps = dipatch => {
  return {
    toggleTimer: () => {
      dispatch(toggleTimer)
    },
    resetTimer: () => {
      dispatch(resetTimer)
    }
  }
}

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

export default TimerContainer