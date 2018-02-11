import {
  tableRows,
  timer,
  errorText,
  alerts,
  remoteTimer,
  sortedTables
} from './reducers'

import { combineReducers } from 'redux'

const brewingApp = combineReducers({
  tableRows,
  timer,
  errorText,
  alerts,
  remoteTimer,
  sortedTables
})

export default brewingApp