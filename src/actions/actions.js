import {
  createRemoteTimer,
  startRemoteTimer,
  stopRemoteTimer,
  updateRemoteTimer,
  resetRemoteTimer
} from '../api/timerAPI'

import {
  createRemoteAlert,
  updateRemoteAlert
} from '../api/alertsAPI'

const ADD_TABLE_ROW = "ADD_TABLE_ROW"
const TOGGLE_EDIT_TABLE_ROW = "TOGGLE_EDIT_TABLE_ROW"
const SAVE_TABLE_ROW = "SAVE_TABLE_ROW"
const TOGGLE_BUTTON_VISIBILITY = "TOGGLE_BUTTON_VISIBILITY"
const START_TIMER = "START_TIMER"
const STOP_TIMER = "STOP_TIMER"
const RESET_TIMER = "RESET_TIMER"
const CREATE_TIMER = "CREATE_TIMER"
const UPDATE_TIMER = "UPDATE_TIMER"
const CREATE_ALERT = "CREATE_ALERT"
const UPDATE_ALERT = "UPDATE_ALERT"
const CREATE_REMOTE_TIMER = "CREATE_REMOTE_TIMER"
const UPDATE_REMOTE_TIMER = "UPDATE_REMOTE_TIMER"

export const addTableRow = tableRow => {
  return {
    type: ADD_TABLE_ROW,
    tableRow
  }
}

export const toggleTableRowEditing = id => {
  return {
    type: TOGGLE_EDIT_TABLE_ROW,
    id
  }
}

export const saveTableRow = cells => {
  return {
    type: SAVE_TABLE_ROW,
    cells
  }
}

export const toggleButtonVisibility = (id, bool) => {
  return {
    type: TOGGLE_BUTTON_VISIBILITY,
    id,
    bool
  }
}

export const createAlert = alert => {
  return {
    type: CREATE_ALERT,
    alert
  }
}

export const updateAlert = alert => {
  return {
    type: UPDATE_ALERT,
    alert
  }
}

export const createTimer = minutes => {
  return {
    type: CREATE_TIMER,
    minutes
  }
}

export const startTimer = time => {
  return {
    type: START_TIMER,
    time
  }
}

export const stopTimer = () => {
  return{
    type: STOP_TIMER
  }
}

export const resetTimer = () => {
  return {
    type: RESET_TIMER
  }
}

export const updateTimer = time => {
  return {
    type: UPDATE_TIMER,
    time
  }
}

export const createRemoteTimerCopy = timer => {
  return {
    type: CREATE_REMOTE_TIMER,
    timer
  }
}

export const updateRemoteTimerCopy = timer => {
  return {
    type: UPDATE_REMOTE_TIMER,
    timer
  }
}

//Async actions

export const requestCreateRemoteTimer = minutes => {
  return dispatch => {
    dispatch(createTimer(minutes))
    return createRemoteTimer(minutes).then(timer => {
      dispatch(createRemoteTimerCopy(timer))
    })
  }
}

export const requestStartRemoteTimer = time => {
  return (dispatch, getState) => {
    dispatch(startTimer(time))
    const remoteTimerID = getState().remoteTimer.id
    return startRemoteTimer(remoteTimerID).then(timer => {
      dispatch(updateRemoteTimerCopy(timer))
    })
  }
}

export const requestStopRemoteTimer = () => {
  return (dispatch, getState) => {
    dispatch(stopTimer())
    const remoteTimer = getState().remoteTimer
    const timer = getState().timer
    const currentTime = `${timer.minutes}:${timer.seconds}`
    const msRemaining = (timer.minutes * 60000) + (timer.seconds * 1000)
    const timerToSend = Object.assign({}, remoteTimer, {
      currentTime,
      msRemaining
    })
    return Promise.all([
      stopRemoteTimer(remoteTimer.id), 
      updateRemoteTimer(remoteTimer.id, timerToSend)
    ])
    .then(timersArray => {
      dispatch(updateRemoteTimerCopy(timersArray[1]))
    })
  }
}

export const requestResetRemoteTimer = () => {
  return (dispatch, getState) => {
    dispatch(resetTimer())
    const remoteTimerID = getState().remoteTimer.id
    return resetRemoteTimer(remoteTimerID).then(timer => {
      dispatch(updateRemoteTimerCopy(timer))
    })
  }
}

export const requestCreateAlert = tableRow => {
  return (dispatch, getState) => {
    dispatch(addTableRow(tableRow))
    const alert = {
      id: tableRow.id,
      description: tableRow.cells[0].value,
      activationTime: tableRow.cells[1].value,
      timerId: getState().remoteTimer.id,
      activated: false
    }
    dispatch(createAlert(alert))
    return createRemoteAlert(alert).then(json => console.log(json))
  }
}

export const requestUpdateAlert = cells => {
  return (dispatch, getState) => {
    dispatch(toggleTableRowEditing(cells[0].tableRowID))
    dispatch(saveTableRow(cells))
    const alert = getState().alerts.filter(
      alert => alert.id === cells[0].tableRowID
    )[0]
    const updatedAlert = {
      ...alert,
      description: cells[0].value,
      activationTime: cells[1].value
    }
    dispatch(updateAlert(updatedAlert))
    return updateRemoteAlert(updatedAlert).then(json => 
      console.log(json)
    )
  }
}

/*
  Timer object:
  {
    minutes: integer,
    seconds: integer,
    active: bool,
    initialMinutes: integer,
    initialSeconds: integer
  }
*/