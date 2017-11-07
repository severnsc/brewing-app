import { connect } from 'react-redux'

import { 
  addTableRow, 
  editTableRow, 
  saveTableRow 
} from '../actions/actions'

const getMaltInventory = (tableRows, tableName) => {
  return tableRows.filter((tableRow) => {
    return tableRow.tableName === tableName
  })
}

const mapStateToProps = (state, ownProps) => {
  return{
    tableRows: getMaltInventory(state.tableRows, ownProps.tableName),
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
      dispatch(editTableRow(id))
    },
    saveTableRow: cells => {
      dispatch(saveTableRow(cells))
    }
  }
}

const MaltInventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryTable)

export default MaltInventory