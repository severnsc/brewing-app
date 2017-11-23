import { connect } from 'react-redux'

import { 
  addTableRow, 
  toggleTableRowEditing, 
  saveTableRow 
} from '../actions/actions'

import EditableTable from '../Components/EditableTable'

const getAlerts = (tableRows) => {
  return tableRows.filter((tableRow) => {
    return tableRow.tableName === "alerts"
  })
}

const mapStateToProps = (state, ownProps) => {

  const columns = [
    {name: "Description", type: "text"},
    {name: "Trigger time", type: "text"}
  ]

  return{
    tableRows: getAlerts(state.tableRows),
    columns,
    name: "alerts"
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
    }
  }
}

const AlertsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default AlertsContainer