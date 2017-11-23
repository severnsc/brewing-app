export const tableRows = (state = [], action) => {
  
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

export const timer = (state = {}, action) => {

  switch(action.type){

    case 'CREATE_TIMER':
      return {
        minutes: action.minutes,
        seconds: 0,
        active: false,
        initialMinutes: action.minutes,
        initialSeconds: 0
      }

    case 'START_TIMER':
      return {
        ...state, 
        active: true,
        lastCheckedTime: action.time
      }

    case 'STOP_TIMER':
      return {
        ...state,
        active: false
      }

    case 'RESET_TIMER':
      return {
              ...state, 
              minutes: state.initialMinutes,
              seconds: state.initialSeconds
            }

    case 'UPDATE_TIMER':
      const diff = action.time - state.lastCheckedTime
      const minutesDiff = Math.floor(diff / 60000)
      const secondsDiff = Math.floor(diff / 1000) % 60
      let newSeconds = state.seconds - secondsDiff
      let newMinutes
      if (newSeconds < 0){
        newSeconds = 60 + newSeconds
        newMinutes = state.minutes - (minutesDiff + 1)
      }else{
        newMinutes = state.minutes - minutesDiff
      }
      return {
        ...state,
        minutes: newMinutes,
        seconds: newSeconds,
        lastCheckedTime: action.time
      }

    default:
      return state

  }

}

export const errorText = (state = "", action) => {

  switch(action.type){

    default:
      return state

  }

}