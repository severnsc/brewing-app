import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Nav = (props) => {
    
    let navClass = props.isOpen ? 'nav open' : 'nav'

    return(
      <nav className={navClass}>
        <ul className="navItems">
          <li><Link onClick={props.onClick} to='/timer'><p>Timer</p></Link></li>
        </ul>
      </nav>
    )

}

export default Nav;