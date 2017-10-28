import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableRow from './TableRow/index.js'
import Button from '../../Components/Button/index.js'

export default class Table extends Component {

  static propTypes = {
    readOnly: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string
    }).isRequired).isRequired 
  }

  state = {
    rows: Array.isArray(this.props.children) ? this.props.children : [this.props.children]
  }

  addRow = () => {
    const newRow = <TableRow key={this.state.rows.length + 1} editing cells={this.props.columns.map((column) => {return {value: "", type: column.type || "text"}})} />
    this.setState((prevState) => ({
          rows: [...prevState.rows, newRow]
        }))
  }

  render(){
    const { columns, readOnly } = this.props
    return(
      <div>
        <TableRow 
          readOnly 
          cells={columns.map((col) => {return {value: col.name, type: col.type || "text"}})}
        />
        {this.state.rows}
        {readOnly || <Button className="round" buttonText="+" onClick={this.addRow} />}
      </div>
    )
  }
}