import React, { Component } from 'react';
import './Timer.css';
import '../../App.css';

class TimerContainer extends Component{
  render(){
    return(
      <div className="componentContainer" id="timerContainer">
        <h2 className="timeText">{this.props.minutes} : {this.props.seconds}</h2>
        <div id="timerButtonContainer">
          <button className={this.props.buttonClass} onClick={() => this.props.toggleTimer()}>{this.props.buttonText}</button>
          <button className="reset" onClick={() => this.props.resetTimer()}>RESET</button>
        </div>
      </div>
    )
  }
}

export default TimerContainer;