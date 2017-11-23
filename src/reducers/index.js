import { tableRows, timer} from './reducers'
import { combineReducers } from 'redux'

const brewingApp = combineReducers({
  tableRows
})

export default brewingApp