const ADD_TABLE_ROW = "ADD_TABLE_ROW"

const addTableRow = (tableName, tableRow) => {
  return {
    type: ADD_TABLE_ROW,
    tableName,
    tableRow
  }
}

/*

tableRow object:

{
  editing: bool,
  readOnly: bool,
  cells: {
    value: String or Number,
    type: String
  }
}

make Table map the tableRow state it's passed and create 
TableRow components from it

*/