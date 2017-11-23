import { connect } from 'react-redux'
import { createTimer } from '../actions'

import TimerForm from '../Components/TimerForm'

const mapStateToProps = state => {
  return {
    errorText: state.errorText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTimer: (minutes) => {
      dispatch(createTimer(minutes))
    }
  }
}

const TimerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerForm)

export default TimerFormContainer