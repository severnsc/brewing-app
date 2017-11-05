import { connect } from 'react-redux'

import { 
  addTableRow, 
  editTableRow, 
  saveTableRow 
} from '../actions/actions'

import InventoryTable from '../Components/InventoryTable'

const getMaltInventory = (tableRows) => {
  return tableRows.filter((tableRow) => {
    return tableRow.tableName === "maltInventory"
  })
}

const mapStateToProps = state => {
  return{
    tableRows: getMaltInventory(state.tableRows)
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