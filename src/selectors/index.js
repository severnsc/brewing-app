import { createSelector } from 'reselect'

export const getAlertRows = createSelector(
  state => state.tableRows,
  (tableRows) => {
    return tableRows.filter(tableRow => 
      tableRow.tableName === "alerts"
    )
  }
)