import React, { Component } from 'react';
import AlertForm from './AlertForm/AlertForm.js'
import '../../../../../App.css';
import '../Alerts.css';

class AlertsContainer extends Component{
  render(){
    return(
      <div className="componentContainer" id="alertsContainer">
        <h2>Create an Alert</h2>
        {this.props.errorText}
        <AlertForm 
          createAlert={this.props.createAlert} 
          maxMinutes={this.props.timerMinutes}
          maxTime={this.props.timerTime}
        />
        <h3>Queued Alerts</h3>
        {this.props.alertComponents}
      </div>
    )
  }
}

export default AlertsContainer;