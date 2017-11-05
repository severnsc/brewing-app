import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button/index.js'

export default class TableRow extends Component{

  static propTypes = {
    readOnly: PropTypes.bool,
    editing: PropTypes.bool,
    cells: PropTypes.arrayOf(PropTypes.shape({
      tableRowId: PropTypes.number,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      type: PropTypes.string
    })).isRequired,
    setEditing: PropTypes.func,
    saveTableRow: PropTypes.func
  }

  static defaultProps = {
    editing: false,
  }

  state = {
    cells: this.props.cells
  }

  handleChange = (e, index) => {
    const cells = this.state.cells.map((cell, i) => {
      return i === index ? {...cell, value: e.target.value} : cell
    })
    this.setState({cells})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.saveTableRow(this.state.cells)
  }

  render(){
    
    if(this.props.editing){
      
      const cells = this.state.cells.map((cell, index) => {
        return(
          <div className="tableCell" key={index}>
            <input
              key={index} 
              type={cell.type} 
              value={cell.value}
              onChange={(e) => {this.handleChange(e, index)}}
            />
          </div>
        )
      })

      return(
        <div className="tableRow">
          <form onSubmit={this.handleSubmit}>
            {cells}
            <Button
              onClick={() => {}}
              className="round"
              type="submit"
              buttonText="save"
              backgroundColor="#05a905"
            />
          </form>
        </div>
      )

    }else{
      
      const cells = this.state.cells.map((cell, index) => {
        return(
          <div className="tableCell" key={index}>
            <p>{cell.value}</p>
          </div>
        )
      })

      return(
        <div className="tableRow">
          {cells}
          {this.props.readOnly || <Button className="round" onClick={() => this.props.setEditing(this.props.id)} buttonText="edit" backgroundColor="#a7a6a6" />}
        </div>
      )

    }

  }

}