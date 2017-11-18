const tableRows = (state = [], action) => {
  
  switch(action.type){
    
    case 'ADD_TABLE_ROW':
      const cells = action.tableRow.cells.map((cell) => {
        return {...cell, tableRowId: action.id}
      })
      return [
        ...state,
        {...action.tableRow, id: action.id, cells}
      ]

    case 'TOGGLE_EDIT_TABLE_ROW':
      return state.map((tableRow) => {
        return (tableRow.id === action.id)
        ? {...tableRow, editing: !tableRow.editing}
        : tableRow
      })

    case 'SAVE_TABLE_ROW':
      return state.map((tableRow) => {
        return (tableRow.id === action.cells[0].tableRowId)
        ? {...tableRow, cells: action.cells}
        : tableRow
      })
    
    default:
      return state

  }
}

export default tableRows