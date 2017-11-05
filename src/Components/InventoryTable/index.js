import React from 'react'
import Table from '../Table'
import TableRow from '../Table/TableRow/index'
import PropTypes from 'prop-types'

const InventoryTable = ({tableRows, addRow, setEditing, saveTableRow}) => {

  const columns = [
    {name: "Name", type: "text"},
    {name: "Amount", type: "number"}
  ]

  const tableRowComponents = tableRows.map((tableRow, index) => {
    return <TableRow id={tableRow.id} key={index} saveTableRow={saveTableRow} setEditing={setEditing} cells={tableRow.cells} editing={tableRow.editing} />
  })

  return(
    <Table 
      columns={columns} 
      name="maltInventory" 
      addRow={addRow}
    >
      {tableRowComponents}
    </Table>
  )
}

InventoryTable.propTypes = {
  tableRows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    tableName: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool,
    cells: PropTypes.arrayOf(PropTypes.shape({
      tableRowId: PropTypes.number.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      type: PropTypes.string
    })).isRequired
  })),
  addRow: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  saveTableRow: PropTypes.func.isRequired
}

export default InventoryTable