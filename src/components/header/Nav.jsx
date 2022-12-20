import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const Nav = () => {
    return (
        <nav className="header__nav">
            <Link to="/search">
                <img className="header__navLink" src="/imgs/magnifying-glass.png" height="20"/>
            </Link>
            <NavLinks/>
            <div className="header__navSignup">
                <span className="header__loginLink">•</span>
                <a href="#" className="header__loginLink link">Log In</a>
                <a href="#" className="header__loginLink groundLink">Sign up</a>
            </div>
        </nav>
    );
}

export default Nav;