export const tableRows = (state = [], action) => {
  
  switch(action.type){
    
    case 'ADD_TABLE_ROW':
      return [
        ...state,
        action.tableRow
      ]

    case 'TOGGLE_EDIT_TABLE_ROW':
      return state.map(tableRow => {
        return (tableRow.id === action.id)
        ? {...tableRow, editing: !tableRow.editing}
        : tableRow
      })

    case 'SAVE_TABLE_ROW':
      return state.map(tableRow => {
        return (tableRow.id === action.id)
        ? {...tableRow, cells: action.cells}
        : tableRow
      })

    case 'DELETE_TABLE_ROW':
      return state.filter(tableRow => tableRow.id !== action.id)
    
    default:
      return state

  }
}

export const sortedTables = (state = [], action) => {

  switch(action.type){

    case 'TOGGLE_TABLE_SORT':
      if(state.findIndex(sortedTable => sortedTable.tableName === action.tableName) === -1){
        return [
          ...state,
          {
            tableName: action.tableName,
            orderBy: action.columnName,
            order: "asc"
          }
        ]
      }else{
        return state.map(sortedTable => {
          if(sortedTable.tableName === action.tableName){
            return sortedTable.orderBy === action.columnName
            ? {...sortedTable, order: sortedTable.order === "asc" ? "desc" : "asc"}
            : {...sortedTable, orderBy: action.columnName, order: "asc"}
          }else{
            return sortedTable
          }
        })
      }

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

export const alerts = (state = [], action) => {

  switch(action.type){

    case 'CREATE_ALERT':
      return [
        ...state,
        action.alert
      ]

    case 'UPDATE_ALERT':
      return state.map(alert => {
        return (alert.id === action.alert.id)
        ? action.alert
        : alert
      })

    case 'DELETE_ALERT':
      return state.filter(alert => alert.id !== action.id)

    default:
      return state

  }

}

export const remoteTimer = (state = {}, action) => {

  switch(action.type){

    case 'UPDATE_REMOTE_TIMER':
      return action.timer

    default:
      return state

  }

}