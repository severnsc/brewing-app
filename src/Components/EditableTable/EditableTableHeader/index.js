import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Div = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const HeaderCell = styled.div`
  flex:1;
  text-align:center;
`

const EditableTableHeader = ({columnNames}) => {

  return(
    <Div>
      {columnNames.map( columnName => {return <HeaderCell key={columnName}>{columnName}</HeaderCell>})}
    </Div>
  )

}

EditableTableHeader.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default EditableTableHeader