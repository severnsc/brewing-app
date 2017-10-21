import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableRow from './TableRow/index.js'
import Button from '../../Components/Button/index.js'

export default class Table extends Component {

  static propTypes = {
    tableName: PropTypes.string,
    columnTypes: PropTypes.object.isRequired
  }

  state = {
    addedRows: []
  }

  addRow = () => {
    const newRow = <TableRow key={this.state.addedRows.length + 1} editing cellTypes={Object.values(this.props.columnTypes)} />
    this.setState((prevState) => {
      addedRows: prevState.addedRows.push(newRow)
    })
  }

  render(){
    if(this.props.readOnly){
      return(
        <div>
          {this.props.children}
        </div>
      )
    }else{
      return(
        <div>
          <TableRow readOnly cellValues={Object.keys(this.props.columnTypes)} />
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