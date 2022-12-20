import React from "react"
import FooterAnother from "./FooterAnother";
import FooterLinks from "./FooterLinks";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <FooterLinks/>
                <hr/>
                <FooterAnother/>
            </div>
        </footer>
    );
}

export default Footer;