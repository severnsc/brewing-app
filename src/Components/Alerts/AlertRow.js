import React, { Component } from 'react';
import '../../App.css';

class AlertRow extends Component{

  render(){
    return(
      <div key={this.props.index} className="alertRow">
        <span>{this.props.minutes} : {this.props.seconds}</span>
        <span>{this.props.description}</span>
        <button onClick={() => this.props.deleteAlert(this.props.index)}>Delete</button>
        <button onClick={() => this.props.editAlert(this.props.alert, this.props.index)}>Edit</button>
      </div>
    )
  }

}

export default AlertRow;