import React, { Component } from 'react';

class Clock extends Component{

  render(){

    const style = {fontSize: "8em"}

    let seconds = this.props.seconds

    if(this.props.seconds < 10){
      seconds = "0" + this.props.seconds
    }

    return(
      <h2 style={style}>{this.props.minutes} : {seconds}</h2>
    )
  }

}

export default Clock