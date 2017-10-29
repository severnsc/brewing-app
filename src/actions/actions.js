const ADD_TABLE_ROW = "ADD_TABLE_ROW"

let nextTableRowId = 0
const addTableRow = (tableRow) => {
  return {
    type: ADD_TABLE_ROW,
    tableRow,
    id: nextTableRowId++
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
    value: String or Number,
    type: String
  }]
}

make Table map the tableRow state it's passed and create 
TableRow components from it

*/