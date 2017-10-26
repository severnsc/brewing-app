import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button/index.js'

export default class TableRow extends Component{

  static propTypes = {
    cellTypes: PropTypes.array.isRequired,
    cellValues: PropTypes.array.isRequired
  }

  static defaultProps = {
    editing: false
  }

  state = {
    editing: this.props.editing,
    cellValues: this.props.cellValues
  }

  setDefaultCellValues = () => {
    return this.props.cellTypes.map(() => {return ""})
  }

  handleChange = (e, index) => {
    let cellValues = this.state.cellValues
    cellValues[index] = e.target.value
    this.setState({cellValues})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({editing: false})
  }

  setEditing = () =>{
    this.setState({editing: true})
  }

  render(){
    
    if(this.state.editing){
      
      const cells = this.props.cellTypes.map((type, index) => {
        return(
          <div className="tableCell" key={index}>
            <input
              key={index} 
              type={type} 
              value={this.state.cellValues[index]} 
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
              className="round"
              type="submit"
              buttonText="save"
              backgroundColor="#05a905"
            />
          </form>
        </div>
      )

    }else{
      
      const cells = this.state.cellValues.map((value, index) => {
        return(
          <div className="tableCell" key={index}>
            <p>{value}</p>
          </div>
        )
      })

      return(
        <div className="tableRow">
          {cells}
          <Button
            className="round"
            onClick={this.setEditing}
            buttonText="edit"
            backgroundColor="#a7a6a6"
          />
        </div>
      )

    }

  }

}