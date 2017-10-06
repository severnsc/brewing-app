import React, { Component } from 'react';
import './style.css'

class Button extends Component{

  render(){
    
    const buttonStyle = {
      backgroundColor: this.props.backgroundColor
    }

    return(
      <button id={this.props.id} style={buttonStyle} onClick={this.props.onClick}>{this.props.buttonText}</button>
    )
  }

}

export default Button