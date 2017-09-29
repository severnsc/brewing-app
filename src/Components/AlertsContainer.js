import React, { Component } from 'react';
import AlertForm from './AlertForm.js'
import '../App.css';

class AlertsContainer extends Component{
  render(){
    return(
      <div className="componentContainer" id="alertsContainer">
        <h2>Create an Alert</h2>
        {this.props.errorText}
        <AlertForm createAlert={this.props.createAlert} />
        <h3>Queued Alerts</h3>
        {this.props.alertComponents}
      </div>
    )
  }
}

export default AlertsContainer;