import TimerFormContainer from '../containers/TimerFormContainer'
import TimerContainer from '../containers/TimerContainer'
import PropTypes from 'prop-types'

const TimerScene = (props, { store }) => {

  if(store.timer){
    <TimerContainer />
  }else{
    <TimerFormContainer />
  }

}

TimerScene.contextTypes = {
  store: PropTypes.object
}

export default TimerScene