import React, { Component } from "react";
import { MenuItems } from "./Menuitems";
import './Navbar.css';

import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";


class Navbar extends Component {
    state = { clicked: false }

handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
}

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">React
                <FontAwesomeIcon icon={faReact} />
                </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <FontAwesomeIcon className="fa" icon={this.state.clicked ? faTimes : faBars} />
                    
                    </div>    
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url}>
                                    {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>  
            </nav>
        )
    }
}

export default Navbar