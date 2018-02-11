import { connect } from 'react-redux'
import TimerScene from '../Scenes/Timer/TimerScene'

const isEmpty = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object
}

const mapStateToProps = state => {
  return {
    timerExists: !isEmpty(state.timer)
  }
}

const TimerSceneContainer = connect(
  mapStateToProps
)(TimerScene)

export default TimerSceneContainer