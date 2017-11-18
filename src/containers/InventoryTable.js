import { connect } from 'react-redux'

import { 
  addTableRow, 
  toggleTableRowEditing, 
  saveTableRow 
} from '../actions/actions'

import EditableTable from '../Components/EditableTable/index'

const getMaltInventory = (tableRows, tableName) => {
  return tableRows.filter((tableRow) => {
    return tableRow.tableName === tableName
  })
}

const mapStateToProps = (state, ownProps) => {
  return{
    tableRows: getMaltInventory(state.tableRows, ownProps.name),
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
    }
  }
}

const InventoryTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default InventoryTable