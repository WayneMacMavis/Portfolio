import React, { Component } from "react";
import { MenuItems } from "./Menuitems";
import { Link } from "react-scroll";
import './Navbar.css';

import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";


class Navbar extends Component {
    state = { clicked: false };
    handleClick = () => {
      this.setState({
        clicked: !this.state.clicked
      });
    };

    render() {
        return(
            <nav className="NavbarItems" id="top">
                <h1 className="navbar-logo">React
                <FontAwesomeIcon icon={faReact} />
                </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <FontAwesomeIcon className="fa" icon={this.state.clicked ? faTimes : faBars} />
                    
                    </div>    
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index) => {
                            return (
                                <Link
                    to={item.url}
                    spy={true}
                    smooth={true}
                    className={item.cName}
                    style={{ textDecoration: "none" }}
                  >
                    <li key={index}>{item.title}</li>
                  </Link>
                            )
                        })}
                    </ul>  
            </nav>
        )
    }
}

export default Navbar