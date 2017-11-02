const ADD_TABLE_ROW = "ADD_TABLE_ROW"
const EDIT_TABLE_ROW = "EDIT_TABLE_ROW"
const UPDATE_TABLE_CELL = "UPDATE_TABLE_CELL"

let nextTableRowId = 0
const addTableRow = (tableRow) => {
  return {
    type: ADD_TABLE_ROW,
    tableRow,
    id: nextTableRowId++
  }
}

const editTableRow = (id) => {
  return {
    type: EDIT_TABLE_ROW,
    id
  }
}

const updateTableCell = (cell) => {
  return {
    type: UPDATE_TABLE_CELL,
    cell
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
    index: Integer,
    value: String or Number,
    type: String
  }]
}

make Table map the tableRow state it's passed and create 
TableRow components from it

*/