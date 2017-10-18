import React, { Component } from 'react';
import Button from '../../../../Components/Button/index.js'
import Clock from '../../../../Components/Clock/index.js'
import './Timer.css';
import '../../../../App.css';

class Timer extends Component{
  render(){
    return(
      <div className="componentContainer" id="timerContainer">
        <Clock minutes={this.props.minutes} seconds={this.props.seconds} />
        <div id="timerButtonContainer">
          <Button backgroundColor={this.props.backgroundColor} onClick={this.props.toggleTimer} buttonText={this.props.buttonText} />
          <Button backgroundColor="#a7a6a6" onClick={this.props.resetTimer} buttonText="RESET" />
        </div>
      </div>
    )
  }
}

export default Timer