import React from 'react'
import PropTypes from 'prop-types'
import FlexDiv from '../FlexDiv'
import Table from '../Table'
import EditableTableRow from './EditableTableRow'
import RoundButton from '../RoundButton'
import shortid from 'shortid'

const CenteredRoundButton = RoundButton.extend`
  align-self:center;
  font-size:1em;
  margin-top:5px;
`

const EditableTable = ({name, addRow, setEditing, saveTableRow, deleteTableRow, columns, tableRows, orderBy, order, onHeaderCellClick}) => {

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

  const renderFunc = rows => rows.map(tableRow => <EditableTableRow key={tableRow.id} id={tableRow.id} cells={tableRow.cells} setEditing={setEditing} saveTableRow={saveTableRow} deleteTableRow={deleteTableRow} editing={tableRow.editing} />)

  return(
    <FlexDiv>
      <Table name={name} columns={columns} tableRows={tableRows} orderBy={orderBy} order={order} onHeaderCellClick={onHeaderCellClick} render={renderFunc} />
      <CenteredRoundButton background="#05a905" onClick={handleClick}>
          &#43;
      </CenteredRoundButton>
    </FlexDiv>
  )
}

EditableTable.propTypes = {
  name: PropTypes.string.isRequired,
  addRow: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  saveTableRow: PropTypes.func.isRequired,
  deleteTableRow: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
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
    })).isRequired,
  })).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onHeaderCellClick: PropTypes.func.isRequired
}

export default EditableTable