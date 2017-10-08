import React, { Component } from 'react';

class Time extends Component{

  render(){

    const style = {fontSize: "8em"}

    return(
      <h2 style={style}>{this.props.minutes} : {this.props.seconds}</h2>
    )
  }

}

export default Time