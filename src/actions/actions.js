const ADD_TABLE_ROW = "ADD_TABLE_ROW"
const TOGGLE_EDIT_TABLE_ROW = "TOGGLE_EDIT_TABLE_ROW"
const SAVE_TABLE_ROW = "SAVE_TABLE_ROW"
const START_TIMER = "START_TIMER"
const STOP_TIMER = "STOP_TIMER"
const RESET_TIMER = "RESET_TIMER"
const CREATE_TIMER = "CREATE_TIMER"
const UPDATE_TIMER = "UPDATE_TIMER"
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

export const createRemoteTimer = timer => {
  return {
    type: CREATE_REMOTE_TIMER,
    timer
  }
}

export const updateRemoteTimer = timer => {
  return {
    type: UPDATE_REMOTE_TIMER,
    timer
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