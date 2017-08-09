import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Nav extends Component{

  render(){
    
    let navClass = this.props.isOpen ? 'nav open' : 'nav'

    return(
      <nav className={navClass}>
        <ul className="navItems">
          <li><Link onClick={this.props.onClick} to='/inventory'><p>Inventory</p></Link></li>
          <ul className="subItems">
            <li><Link onClick={this.props.onClick} to='/inventory/malt'><p>Malt</p></Link></li>
            <li><Link onClick={this.props.onClick} to='/inventory/hops'><p>Hops</p></Link></li>
            <li><Link onClick={this.props.onClick} to='/inventory/yeast'><p>Yeast</p></Link></li>
          </ul>
          <li><Link onClick={this.props.onClick} to='/timer'><p>Timer</p></Link></li>
          <li><Link onClick={this.props.onClick} to='/profile'><p>Current User</p></Link></li>
        </ul>
      </nav>
    )
  }

}

export default Nav;