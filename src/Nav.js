import React, { Component } from 'react';
import './App.css';

class Nav extends Component{

  render(){
    
    let navClass = this.props.isOpen ? 'nav open' : 'nav'

    return(
      <nav className={navClass}>
        <ul>
          <li><p>Inventory</p></li>
          <li><p>Timer</p></li>
          <li><p>Current User</p></li>
        </ul>
      </nav>
    )
  }

}

export default Nav;