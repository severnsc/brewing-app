import { tableRows, timer, errorText, alerts} from './reducers'
import { combineReducers } from 'redux'

const brewingApp = combineReducers({
  tableRows,
  timer,
  errorText,
  alerts
})

export default brewingApp