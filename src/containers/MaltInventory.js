import { connect } from 'react-redux'
import { addTableRow } from '../actions'
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
    }
  }
}

const MaltInventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryTable)

export default MaltInventory