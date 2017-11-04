import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableRow from './TableRow/index.js'
import Button from '../../Components/Button/index.js'

const Table = ({readOnly, name, addRow, columns, children}) => {

  addRow = () => {
    const cells = columns.map((column) => {
      return {value: "", type: column.type}
    })
    const newRow = {
      tableName: name,
      editing: true,
      readOnly: false,
      cells
    }
    addRow(newRow)
  }

  render(){
    return(
      <div>
        <TableRow 
          readOnly 
          cells={columns.map((col) => {return {value: col.name, type: col.type || "text"}})}
        />
        {children}
        {readOnly || <Button className="round" buttonText="+" onClick={addRow} />}
      </div>
    )
  }
}

Table.propTypes = {
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  addRow: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string
  }).isRequired).isRequired 
}

export default Table