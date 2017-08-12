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
    this.props.onSubmit(this.state.minutes, this.state.seconds, this.state.description)
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
      <form onSubmit={this.handleSubmit}>
        <label>Time to trigger alert</label>
        <input type="text" name="minutes" value={this.state.minutes} onChange={this.handleChange} />
        :
        <input type="text" name="seconds" value={this.state.seconds} onChange={this.handleChange} />
        <label>Alert description</label>
        <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        <input type="submit" value="Create Alert" />
      </form>
    )
  }

}

export default Alert;