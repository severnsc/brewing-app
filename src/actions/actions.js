const ADD_TABLE_ROW = "ADD_TABLE_ROW"
const EDIT_TABLE_ROW = "EDIT_TABLE_ROW"
const SAVE_TABLE_ROW = "SAVE_TABLE_ROW"

let nextTableRowId = 0
export const addTableRow = (tableRow) => {
  return {
    type: ADD_TABLE_ROW,
    tableRow,
    id: nextTableRowId++
  }
}

//Remove editing state from TableRow, use this passed down as prop
const editTableRow = (id) => {
  return {
    type: EDIT_TABLE_ROW,
    id
  }
}

const saveTableRow = (cells) => {
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