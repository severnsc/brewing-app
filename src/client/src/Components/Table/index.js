import React from 'react'
import PropTypes from 'prop-types'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import styled from 'styled-components'

const FlexTable = styled.table`
  display:flex;
  flex-flow:column;
`

const TableContainer = styled.div`
  display:flex;
  flex-flow:column;
  width:100%;
`

const Table = ({name, render, columns, tableRows, orderBy, order, onHeaderCellClick, displayLimit}) => {

  const headerCellClick = columnName => {
    onHeaderCellClick(name, columnName)
  }

  let rows = tableRows

  if(orderBy){
    const index = columns.findIndex(col => col.name === orderBy)
    if(order === "asc"){
      rows = tableRows.concat().sort((a,b) => {
        if(a.cells[index].value < b.cells[index].value){
          return -1
        }else if(a.cells[index].value === b.cells[index].value){
          return 0
        }else{
          return 1
        }
      })
    }else if(order === "desc"){
      rows = tableRows.concat().sort((a,b) => {
        if(a.cells[index].value < b.cells[index].value){
          return 1
        }else if(a.cells[index].value === b.cells[index].value){
          return 0
        }else{
          return -1
        }
      })
    }
  }

  if(displayLimit) rows = rows.slice(0, displayLimit)

  return(
    <TableContainer>
      <FlexTable>
        <TableHeader
          columnNames={columns.map((col) => {return col.name} )}
          onClick={headerCellClick}
          order={order}
          orderBy={orderBy}
        />
        <tbody>
          {render(rows)}
        </tbody>
      </FlexTable>
    </TableContainer>
  )

}

Table.propTypes = {
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
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
  onHeaderCellClick: PropTypes.func.isRequired,
  displayLimit: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ])
}

Table.defaultProps = {
  render: rows => rows.map(tableRow => <TableRow key={tableRow.id} id={tableRow.id} cells={tableRow.cells} />)
}

export default Table