import shortid from 'shortid'
const ADD_TABLE_ROW = "ADD_TABLE_ROW"
const TOGGLE_EDIT_TABLE_ROW = "TOGGLE_EDIT_TABLE_ROW"
const SAVE_TABLE_ROW = "SAVE_TABLE_ROW"

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

/*

tableRow object:

{
  id: Integer,
  tableName: String,
  editing: bool,
  readOnly: bool,
  cells: [{
    tableRowId: Integer,
    value: String or Number,
    type: String
  }]
}

make Table map the tableRow state it's passed and create 
TableRow components from it

*/