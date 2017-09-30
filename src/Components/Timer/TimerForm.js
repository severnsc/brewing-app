import React, { Component } from 'react';
import '../../App.css';

class TimerForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      minutes: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({minutes: e.target.value})
  }  

  render(){
    return(
      <div className="componentContainer">
        <h1>Create a New Timer</h1>
        <form onSubmit={this.props.handleSubmit(this.state.minutes)} id="timerForm">
          <div id="inputContainer">
            <input type="text" value={this.state.minutes} id="minutesInput" onChange={this.handleChange} /><span id="minutes">minutes</span>
          </div>
          <div id="submitContainer">
            <button type="submit" value="Create Timer" id="timerSubmit">
              Create Timer
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default TimerForm;