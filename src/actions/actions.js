import shortid from 'shortid'
const ADD_TABLE_ROW = "ADD_TABLE_ROW"
const TOGGLE_EDIT_TABLE_ROW = "TOGGLE_EDIT_TABLE_ROW"
const SAVE_TABLE_ROW = "SAVE_TABLE_ROW"
const TOGGLE_TIMER = "TOGGLE_TIMER"
const RESET_TIMER = "RESET_TIMER"
const CREATE_TIMER = "CREATE_TIMER"

export const addTableRow = (tableRow) => {
  return {
    type: ADD_TABLE_ROW,
    tableRow,
    id: shortid.generate()
  }
}

export const toggleTableRowEditing = (id) => {
  return {
    type: TOGGLE_EDIT_TABLE_ROW,
    id
  }
}

export const saveTableRow = (cells) => {
  return {
    type: SAVE_TABLE_ROW,
    cells
  }
}

export const createTimer = (minutes) => {
  type: CREATE_TIMER,
  minutes
}

export const toggleTimer = () => {
  type: TOGGLE_TIMER
}

export const resetTimer = () => {
  type: RESET_TIMER
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