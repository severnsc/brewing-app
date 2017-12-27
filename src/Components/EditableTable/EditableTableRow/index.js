import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button/index.js'
import styled from 'styled-components'

const TableRow = styled.div`
  display:flex;
  flex-direction:row;
`

const TableCell = styled.div`
  flex:1;
  margin:5px;
`

const FlexForm = styled.form`
  display:flex;
`

const EditableTableRow = ({id, editing, cells, setEditing, saveTableRow}) => {

  const toggleEdit = (e) => {
    e.preventDefault()
    const newCells = []
    for(let i=0;i<e.target.length - 1;i++){
      newCells.push({...cells[i], value: e.target[i].value})
    }
    console.log(newCells)
    saveTableRow(newCells)
  }
    
  if(editing){
    
    const tableCells = cells.map((cell) => {
      return(
        <TableCell key={cell.id}>
          <input
            key={cell.id}
            id={cell.id} 
            type={cell.type} 
            defaultValue={cell.value}
          />
        </TableCell>
      )
    })

    return(
      <TableRow>
        <FlexForm onSubmit={toggleEdit}>
          {tableCells}
          <Button
            onClick={() => {}}
            className="round"
            type="submit"
            background="#05a905"
          >
            &#10004;
          </Button>
        </FlexForm>
      </TableRow>
    )

  }else{
    
    const tableCells = cells.map((cell) => {
      return(
        <TableCell key={cell.id}>
          <p>{cell.value}</p>
        </TableCell>
      )
    })

    return(
      <TableRow>
        {tableCells}
        <Button className="round" onClick={toggleEdit} backgroundColor="#a7a6a6">
          &#9998;
        </Button>
      </TableRow>
    )

  }

}

EditableTableRow.propTypes = {
  id: PropTypes.string.isRequired,
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
  saveTableRow: PropTypes.func.isRequired
}

EditableTableRow.defaultProps = {
  editing: false,
}

export default EditableTableRow