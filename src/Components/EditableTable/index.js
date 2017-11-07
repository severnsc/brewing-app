import React from 'react'
import PropTypes from 'prop-types'
import EditableTableHeader from './EditableTableHeader/index'
import EditableTableRow from './EditableTableRow/index'
import Button from '../../Components/Button/index'

const EditableTable = ({name, addRow, setEditing, saveTableRow, columns, tableRows}) => {

  const handleClick = () => {
    const cells = columns.map((column) => {
      return {value: "", type: column.type}
    })
    const newRow = {
      tableName: name,
      editing: true,
      cells
    }
    addRow(newRow)
  }

  return(
    <div>
      <EditableTableHeader
        columnNames={columns.map((col) => {return col.value} )}
      />
      {tableRows.map( tableRow => 
        {return <EditableTableRow cells={tableRow.cells} editing={tableRow.editing} setEditing={setEditing} saveTableRow={saveTableRow} />}
      )}
      <Button className="round" buttonText="&#43;" onClick={handleClick} />
    </div>
  )
}

Table.propTypes = {
  name: PropTypes.string.isRequired,
  addRow: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  saveTableRow: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string
  }).isRequired).isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    tableName: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    cells: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      type: PropTypes.string.isRequired
    })).isRequired
  })).isRequired
}

export default EditableTable