import React, { useState } from "react";
import { MenuItems } from "./Menuitems";
import { Link } from "react-scroll";
import './Navbar.css';

import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
   const [click, setClick] = useState(false);
  
  const handleClick = () => {
    setClick(!click);
  }
        return(
            <nav className="NavbarItems" id="top">
                <h1 className="navbar-logo">Powered by React
                <FontAwesomeIcon icon={faReact} />
                </h1>
                <div className="menu-icon" onClick={handleClick}>
                    <FontAwesomeIcon className="fa" icon={click ? faTimes : faBars} />
                    
                    </div>    
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
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

export default Navbar