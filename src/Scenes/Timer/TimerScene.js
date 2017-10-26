import React, { Component } from 'react';
import '../../App.css';
import TimerForm from './Components/TimerComponents/TimerForm.js';
import Timer from './Components/TimerComponents/Timer.js';
import Table from '../../Components/Table/index.js'
import TableRow from '../../Components/Table/TableRow/index.js'

export default class TimerScene extends Component{

  state = {
    minutes: null,
  }

  timerFormSubmit = (minutes) => {
    this.setState({minutes: parseInt(minutes, 10)})
  }

  render(){

    if(this.state.minutes === null){
      return(
        <TimerForm handleSubmit={this.timerFormSubmit} />
      )
    }else{
      return(
        <div>
          <Timer minutes={this.state.minutes} />
          <Table columnTypes={{name: "text", amount: "text"}}>
            <TableRow cellTypes={["text", "text"]} cellValues={["name", "amount"]} />
          </Table>
        </div>
      )
    } 
  }
}