import React, { Component } from 'react';
import './App.css';

class Nav extends Component{

  render(){
    
    let navClass = this.props.isOpen ? 'nav open' : 'nav'

    return(
      <nav className={navClass}>
        <ul className="navItems">
          <li><p>Inventory</p></li>
          <ul className="subItems">
            <li>Malt</li>
            <li>Hops</li>
            <li>Yeast</li>
          </ul>
          <li><p>Timer</p></li>
          <li><p>Current User</p></li>
        </ul>
      </nav>
    )
  }

}

export default Nav;