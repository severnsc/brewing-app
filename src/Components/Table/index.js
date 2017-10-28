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
    }).isRequired) 
  }

  static defaultProps = {
    columns: {
      name: "",
      type: "text"
    }
  }

  state = {
    addedRows: []
  }

  addRow = () => {
    const defaultValues = this.props.columns.map(() => {return ""})
    const newRow = <TableRow key={this.state.addedRows.length + 1} editing cellTypes={this.props.columns.map((column) => {return column.type})} cellValues={defaultValues} />
    this.setState((prevState) => ({
          addedRows: prevState.addedRows.concat([newRow])
        }))
  }

  render(){
    if(this.props.readOnly){
      return(
        <div>
          <TableRow 
            readOnly 
            cellValues={this.props.columns.map((column) => {return column.name})}
            cellTypes={this.props.columns.map((column) => {return column.type})}
          />
          {this.props.children}
        </div>
      )
    }else{
      return(
        <div>
          <TableRow 
            readOnly 
            cellValues={this.props.columns.map((column) => {return column.name})}
            cellTypes={this.props.columns.map((column) => {return column.type})}
          />
          {this.props.children}
          {this.state.addedRows}
          <Button
            className="round"
            buttonText="+"
            onClick={this.addRow}
          />
        </div>
      )
    }
  }

}