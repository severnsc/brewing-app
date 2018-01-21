import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Thead = styled.thead`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const HeaderRow = styled.tr`
  display: flex;
  flex: 1;
  border-bottom:1px solid rgb(224, 224, 224);
  color:#4e4e4e;
`

const HeaderCell = styled.td`
  flex:1;
`

const EditableTableHeader = ({columnNames, onClick}) => {

  return(
    <Thead>
      <HeaderRow>
        {columnNames.map( columnName => {return <HeaderCell key={columnName} onClick={() => onClick(columnName)}>{columnName}</HeaderCell>})}
      </HeaderRow>
    </Thead>
  )

}

EditableTableHeader.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
}

export default EditableTableHeader