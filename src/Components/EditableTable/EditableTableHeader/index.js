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
`

const HeaderCell = styled.td`
  flex:1;
`

const EditableTableHeader = ({columnNames}) => {

  return(
    <Thead>
      <HeaderRow>
        {columnNames.map( columnName => {return <HeaderCell key={columnName}>{columnName}</HeaderCell>})}
      </HeaderRow>
    </Thead>
  )

}

EditableTableHeader.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default EditableTableHeader