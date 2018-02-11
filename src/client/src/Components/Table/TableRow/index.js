import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FlexTableRow = styled.tr`
  display:flex;
  flex-direction:row;
  position:relative;
  border-bottom:1px solid rgb(224, 224, 224);
  margin-top:5px;
  &:hover button {
    opacity: 1
  }
`

const TableCell = styled.td`
  flex:1;
  padding:5px 0;
`

const TableRow = ({id, cells}) => {
  
  const tableCells = cells.map((cell) => {
    return(
      <TableCell key={cell.id}>
        {cell.value}
      </TableCell>
    )
  })

  return(
    <FlexTableRow>
      {tableCells}
    </FlexTableRow>
  )

}

TableRow.propTypes = {
  id: PropTypes.string.isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tableRowID: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    type: PropTypes.string.isRequired
  })).isRequired
}

export default TableRow