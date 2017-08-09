import React, { Component } from 'react';
import './App.css';

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

    if(isMobile){
      return(
        <main className={mainClass} onClick={this.props.onClick}>
          <div className="componentContainer">
            <h2>App stuff goes in here</h2>
          </div>
          <div className="componentContainer">
            <h2>App stuff goes in here</h2>
          </div>
          <div className="componentContainer">
            <h2>App stuff goes in here</h2>
          </div>
        </main>
      )
    }else{
      return(
        <main className={mainClass} onClick={this.props.onClick}>
          <div className="componentRow">
            <div className="componentContainer">
              <h2>App stuff goes in here</h2>
            </div>
            <div className="componentContainer">
              <h2>App stuff goes in here</h2>
            </div>
            <div className="componentContainer">
              <h2>App stuff goes in here</h2>
            </div>
          </div>
          <div className="componentRow">
            <div className="componentContainer">
              <h2>App stuff goes in here</h2>
            </div>
            <div className="componentContainer">
              <h2>App stuff goes in here</h2>
            </div>
            <div className="componentContainer">
              <h2>App stuff goes in here</h2>
            </div>
          </div>
        </main>
      )
    }
  }

}

export default Main;