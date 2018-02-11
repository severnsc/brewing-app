import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button'
import RoundButton from '../../RoundButton'
import styled from 'styled-components'

const TableRow = styled.tr`
  display:flex;
  flex-direction:row;
  position:relative;
  border-bottom:1px solid rgb(224, 224, 224);
  margin-top:5px;
  &:hover button {
    opacity: 1
  }
  button {
    opacity: 0
  }
`

const TableCell = styled.td`
  flex:1;
  padding:5px 0;
`

const FlexForm = styled.form`
  display:flex;
  button {
    opacity: 1;
  }
`

const FlexInput = styled.input`
  flex:1;
  &:first-child {
    margin:0 10px 0 0;
  };
  margin-left: 15px;
`

const EditButton = RoundButton.extend`
  color: black;
  font-size: 1em;
`

const DeleteButton = RoundButton.extend`
  color: white;
  font-size: 1em;
`

const EditableTableRow = ({id, editing, cells, setEditing, saveTableRow, deleteTableRow}) => {

  const saveRow = (e) => {
    e.preventDefault()
    const newCells = []
    for(let i=0;i<e.target.length - 1;i++){
      newCells.push({...cells[i], value: e.target[i].value})
    }
    saveTableRow(id, newCells)
  }

  const deleteRow = () => {
    deleteTableRow(id)
  }

  const toggleEdit = () => {
    setEditing(id)
  }
    
  if(editing){
    
    const tableCells = cells.map((cell) => {
      return(
        <FlexInput
          key={cell.id}
          id={cell.id} 
          type={cell.type} 
          defaultValue={cell.value}
        />
      )
    })

    return(
      <TableRow>
        <TableCell>
          <FlexForm onSubmit={saveRow}>
            {tableCells}
            <Button
              style={{marginLeft: 5 + "px"}}
              onClick={() => {}}
              className="round"
              type="submit"
              background="#05a905"
            >
              &#10004;
            </Button>
          </FlexForm>
        </TableCell>
      </TableRow>
    )

  }else{
    
    const tableCells = cells.map((cell) => {
      return(
        <TableCell key={cell.id}>
          {cell.value}
        </TableCell>
      )
    })

    return(
      <TableRow>
        {tableCells}
        <TableCell style={{
          position: "absolute",
          right: 0,
          padding:0
        }}>
          <EditButton onClick={toggleEdit} background="#c1c1c1">
            &#9998;
          </EditButton>
          <DeleteButton onClick={deleteRow} background="red">
            X
          </DeleteButton>
        </TableCell>
      </TableRow>
    )

  }

}

EditableTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  editing: PropTypes.bool,
  setEditing: PropTypes.func.isRequired,
  deleteTableRow: PropTypes.func.isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tableRowID: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  saveTableRow: PropTypes.func.isRequired,
}

EditableTableRow.defaultProps = {
  editing: false,
}

export default EditableTableRow