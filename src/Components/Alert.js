import React, { Component } from 'react';
import '../App.css';

class Alert extends Component{

  constructor(props){
    super(props);
    this.state = {
      minutes: "00",
      seconds: "00",
      description: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.createAlert(this.state.minutes, this.state.seconds, this.state.description)
    this.setState({
      minutes:"00",
      seconds:"00",
      description: ""
    })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} id="alertForm">
        <div>
          <label>Time to trigger alert</label>
          <input id="alertMinutes" type="text" name="minutes" value={this.state.minutes} onChange={this.handleChange} />
          :
          <input type="text" name="seconds" value={this.state.seconds} onChange={this.handleChange} />
        </div>
        <div id="alertContainer">
          <label>Alert description</label>
          <input id="alertDescription" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </div>
        <div>
          <input id="createAlertButton" type="submit" value="Create Alert" />
        </div>
      </form>
    )
  }

}

export default Alert;