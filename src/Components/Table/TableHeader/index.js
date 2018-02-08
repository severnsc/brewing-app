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
  cursor:pointer;
`

const TableHeader = ({columnNames, onClick, order, orderBy}) => {

  let arrowStyle
  if(order === 'asc'){
    arrowStyle = {
      transform: 'rotate(' + 180 + 'deg)',
      display: 'inline-block'
    }
  }else if(order === 'desc'){
    arrowStyle = {display: 'inline'}
  }

  return(
    <Thead>
      <HeaderRow>
        {columnNames.map( columnName => {return <HeaderCell key={columnName} onClick={() => onClick(columnName)}>{columnName}{columnName === orderBy ? <span style={arrowStyle}>▾</span> : ''}</HeaderCell>})}
      </HeaderRow>
    </Thead>
  )

}

TableHeader.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string
}

export default TableHeader