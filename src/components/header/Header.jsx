import React from "react";
import Icons from "./Icons";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
    return (
        <header className="header">
            <Icons/>
            <Logo/>
            <Nav/>
        </header>
    );
}

export default Header;