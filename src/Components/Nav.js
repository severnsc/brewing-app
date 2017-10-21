import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Nav extends Component{

  render(){
    
    let navClass = this.props.isOpen ? 'nav open' : 'nav'

    return(
      <nav className={navClass}>
        <ul className="navItems">
          <li><Link onClick={this.props.onClick} to='/timer'><p>Timer</p></Link></li>
        </ul>
      </nav>
    )
  }

}

export default Nav;