import { createSelector } from 'reselect'

export const getAlertRows = createSelector(
  state => state.tableRows,
  (tableRows) => {
    return tableRows.filter(tableRow => 
      tableRow.tableName === "alerts"
    )
  }
)

export const alertsToBeFired = createSelector(
  state => state.alerts,
  state => state.timer,
  (alerts, timer) => {
    console.log(alerts)
    return alerts.filter(alert => 
      parseInt(alert.minutes, 10) === timer.minutes && 
        parseInt(alert.seconds, 10) === timer.seconds
    )
  }
)