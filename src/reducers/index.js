import { tableRows, timer, errorText} from './reducers'
import { combineReducers } from 'redux'

const brewingApp = combineReducers({
  tableRows,
  timer,
  errorText
})

export default brewingApp