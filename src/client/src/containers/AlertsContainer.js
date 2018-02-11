import { connect } from 'react-redux'

import {
  toggleTableRowEditing,
  requestCreateAlert,
  requestUpdateAlert,
  requestDeleteAlert,
  toggleTableSort
} from '../actions/actions'

import { 
  getAlertRows
} from '../selectors'

import EditableTable from '../Components/EditableTable'

const getOrderBy = sortedTables => {
  const sortedAlertsTableArray = sortedTables.filter(sortedTable => sortedTable.tableName === "alerts")
  return sortedAlertsTableArray.length === 1
  ? sortedAlertsTableArray[0].orderBy
  : null
}

const getOrder = sortedTables => {
  const sortedAlertsTableArray = sortedTables.filter(sortedTable => sortedTable.tableName === "alerts")
  console.log(sortedAlertsTableArray.length)
  if(sortedAlertsTableArray.length === 1){
    return sortedAlertsTableArray[0].order
  }else{
    return null
  }
}

const mapStateToProps = state => {

  const columns = [
    {name: "Description", type: "text"},
    {name: "Activation time", type: "text"}
  ]

  return{
    tableRows: getAlertRows(state),
    columns,
    name: "alerts",
    orderBy: getOrderBy(state.sortedTables),
    order: getOrder(state.sortedTables)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRow: tableRow => {
      dispatch(requestCreateAlert(tableRow))
    },
    setEditing: id => {
      dispatch(toggleTableRowEditing(id))
    },
    saveTableRow: (id, cells) => {
      dispatch(requestUpdateAlert(id, cells))
    },
    deleteTableRow: id => {
      dispatch(requestDeleteAlert(id))
    },
    onHeaderCellClick: (tableName, columnName) => {
      dispatch(toggleTableSort(tableName, columnName))
    }
  }
}

const AlertsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default AlertsContainer