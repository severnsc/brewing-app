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

    case 'UPDATE_TABLE_CELL':
      return state.map((tableRow) => {
        if(tableRow.id === action.cell.tableRowId){
          {
            ...tableRow,
            cells: [
              ...tableRow.cells.slice(0, action.cell.index),
              action.cell,
              ...tableRow.cells.slice(action.cell.index + 1)
            ]
          }
        }else{
          tableRow
        }
      })
    
    default:
      return state

  }
}