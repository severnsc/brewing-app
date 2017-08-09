import React, { Component } from 'react';
import '../App.css';
import Timer from './Timer.js';

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
      width: window.innerWidth,
    };
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
  }

  componentWillMount(){
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange(){
    this.setState({width: window.innerWidth})
  }

  render(){

    const {width} = this.state
    const isMobile = width < 768

    let mainClass = this.props.isOpen ? "main open" : "main"

      return(
        <main className={mainClass} onClick={this.props.onClick}>
            <div className="componentContainer">
              <Timer time={5400000} />
            </div>
        </main>
      )
    }
  }

export default Main;