import React from 'react'
import PropTypes from 'prop-types'
import EditableTableHeader from './EditableTableHeader'
import EditableTableRow from './EditableTableRow'
import RoundButton from '../../Components/RoundButton'
import shortid from 'shortid'

const EditableTable = ({name, addRow, setEditing, saveTableRow, columns, tableRows}) => {

  const handleClick = () => {
    const tableRowID = shortid.generate()
    const cells = columns.map((column) => {
      return {
        id: shortid.generate(),
        tableRowID,
        value: "", 
        type: column.type
      }
    })
    const newRow = {
      id: tableRowID,
      tableName: name,
      editing: true,
      cells
    }
    addRow(newRow)
  }

  return(
    <div>
      <EditableTableHeader
        columnNames={columns.map((col) => {return col.name} )}
      />
      {tableRows.map( tableRow => 
        {return <EditableTableRow key={tableRow.id} id={tableRow.id} cells={tableRow.cells} editing={tableRow.editing} setEditing={setEditing} saveTableRow={saveTableRow} />}
      )}
      <RoundButton background="#05a905" onClick={handleClick}>
        &#43;
      </RoundButton>
    </div>
  )
}

EditableTable.propTypes = {
  name: PropTypes.string.isRequired,
  addRow: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  saveTableRow: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string
  }).isRequired).isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tableName: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    cells: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      tableRowID: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      type: PropTypes.string.isRequired
    })).isRequired
  })).isRequired
}

export default EditableTable