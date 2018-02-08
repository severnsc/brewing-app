import { connect } from 'react-redux'

import { 
  addTableRow, 
  toggleTableRowEditing, 
  saveInventoryTableRow,
  deleteTableRow,
  toggleTableSort
} from '../actions/actions'

import EditableTable from '../Components/EditableTable'

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
    addRow: tableRow => {
      dispatch(addTableRow(tableRow))
    },
    setEditing: id => {
      dispatch(toggleTableRowEditing(id))
    },
    saveTableRow: (id, cells) => {
      dispatch(saveInventoryTableRow(id, cells))
    },
    deleteTableRow: id => {
      dispatch(deleteTableRow(id))
    },
    onHeaderCellClick: (tableName, columnName) => {
      dispatch(toggleTableSort(tableName, columnName))
    }
  }
}

const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default InventoryContainer