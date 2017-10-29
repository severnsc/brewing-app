const tableRows = (state = [], action) => {
  
  switch(action.type){
    
    case 'ADD_TABLE_ROW':
      return [
        ...state,
        {...action.tableRow, id: action.id}
      ]
    
    default:
      return state

  }
}