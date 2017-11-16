import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button/index.js'

export default class EditableTableRow extends Component{

  static propTypes = {
    id: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    cells: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      type: PropTypes.string.isRequired
    })).isRequired,
    setEditing: PropTypes.func.isRequired,
    saveTableRow: PropTypes.func.isRequired
  }

  static defaultProps = {
    editing: false,
  }

  state = {
    cells: this.props.cells
  }

  handleChange = (e) => {
    const cells = this.state.cells.map((cell) => {
      return e.target.id === cell.id ? {...cell, value: e.target.value} : cell
    })
    this.setState({cells})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.saveTableRow(this.state.cells)
  }

  render(){
    
    if(this.props.editing){
      
      const cells = this.state.cells.map((cell) => {
        return(
          <div className="tableCell" key={cell.id}>
            <input
              key={cell.id}
              id={cell.id} 
              type={cell.type} 
              value={cell.value}
              onChange={this.handleChange}
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
              buttonText="&#10004;"
              backgroundColor="#05a905"
            />
          </form>
        </div>
      )

    }else{
      
      const cells = this.state.cells.map((cell) => {
        return(
          <div className="tableCell" key={cell.id}>
            <p>{cell.value}</p>
          </div>
        )
      })

      return(
        <div className="tableRow">
          {cells}
          <Button className="round" onClick={() => this.props.setEditing(this.props.id)} buttonText=" &#9998;" backgroundColor="#a7a6a6" />
        </div>
      )

    }

  }

}