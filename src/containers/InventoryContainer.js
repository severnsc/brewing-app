import { connect } from 'react-redux'

import { 
  addTableRow, 
  toggleTableRowEditing, 
  saveTableRow,
  deleteTableRow
} from '../actions/actions'

import EditableTable from '../Components/EditableTable'

const getInventoryRows = (tableRows, tableName) => {
  return tableRows.filter(tableRow => tableRow.tableName === tableName)
}

const mapStateToProps = (state, ownProps) => {
  return{
    tableRows: getInventoryRows(state.tableRows, ownProps.name),
    columns: ownProps.columns,
    name: ownProps.name
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
    saveTableRow: cells => {
      dispatch(saveTableRow(cells))
    },
    deleteTableRow: id => {
      dispatch(deleteTableRow(id))
    }
  }
}

const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default InventoryContainer