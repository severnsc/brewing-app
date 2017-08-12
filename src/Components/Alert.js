import React, { Component } from 'react';
import '../App.css';

class Alert extends Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Time to trigger alert</label>
        <input type="text" name="minutes" />:<input type="text" name="seconds" />
        <label>Alert description</label>
        <input type="text" name="alertDescription" />
        <input type="submit" value="Create Alert" />
      </form>
    )
  }

}

export default Alert;