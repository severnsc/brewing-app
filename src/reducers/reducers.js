const tableRows = (state = [], action) => {
  
  switch(action.type){
    
    case 'ADD_TABLE_ROW':
      return [
        ...state,
        {...action.tableRow, id: action.id}
      ]

    case 'EDIT_TABLE_ROW':
      return state.map((tablerow) => {
        (tableRow.id === action.id)
        ? {...tableRow, editing: true}
        : tableRow
      })

    case 'SAVE_TABLE_ROW':
      return state.map((tableRow) => {
        (tableRow.id === action.cells[0].tableRowId)
        ? {...tableRow, cells: action.cells, editing: false}
        : tableRow
      })
    
    default:
      return state

  }
}