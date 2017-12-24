import {
  tableRows,
  timer,
  errorText,
  alerts,
  remoteTimer
} from './reducers'

import { combineReducers } from 'redux'

const brewingApp = combineReducers({
  tableRows,
  timer,
  errorText,
  alerts,
  remoteTimer
})

export default brewingApp