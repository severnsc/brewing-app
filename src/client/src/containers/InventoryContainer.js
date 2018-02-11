import { connect } from 'react-redux'

import {toggleTableSort} from '../actions/actions'

import Table from '../Components/Table'

const getOrderBy = (sortedTables, name) => {
  const sortedAlertsTableArray = sortedTables.filter(sortedTable => sortedTable.tableName === name)
  return sortedAlertsTableArray.length === 1
  ? sortedAlertsTableArray[0].orderBy
  : null
}

const getOrder = (sortedTables, name) => {
  const sortedAlertsTableArray = sortedTables.filter(sortedTable => sortedTable.tableName === name)
  console.log(sortedAlertsTableArray.length)
  if(sortedAlertsTableArray.length === 1){
    return sortedAlertsTableArray[0].order
  }else{
    return null
  }
}

const getInventoryRows = (tableRows, tableName) => {
  return tableRows.filter(tableRow => tableRow.tableName === tableName)
}

const mapStateToProps = (state, ownProps) => {
  return{
    tableRows: getInventoryRows(state.tableRows, ownProps.name),
    columns: ownProps.columns,
    name: ownProps.name,
    orderBy: getOrderBy(state.sortedTables, ownProps.name),
    order: getOrder(state.sortedTables, ownProps.name),
    displayLimit: ownProps.displayLimit || false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHeaderCellClick: (tableName, columnName) => {
      dispatch(toggleTableSort(tableName, columnName))
    }
  }
}

const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)

export default InventoryContainer