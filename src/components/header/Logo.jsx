import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="header__logo">
            <Link to="/popular">
                <img src="/imgs/logo.png" width="110"/>
            </Link>
        </div>
    );
}

export default Logo;