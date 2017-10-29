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
    
    default:
      return state

  }
}