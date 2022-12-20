import React from 'react';
import FooterHelp from './FooterHelp';
import FooterCompany from './FooterCompany';
import FooterGoodies from './FooterGoodies';
import FooterAccount from './FooterAccount';
import FooterFollow from './FooterFollow';

const FooterLinks = () => {
    return (
        <div className="footer__links">
            <section className="footer__nav">
                <h2>Company</h2>
                <FooterCompany/>
            </section>
            <section className="footer__nav">
                <h2>Help</h2>
                <FooterHelp/>
            </section>
            <section className="footer__nav">
                <h2>Goodies</h2>
                <FooterGoodies/>
            </section>
            <section className="footer__nav">
                <h2>Account</h2>
                <FooterAccount/>
            </section>
            <section className="footer__nav">
                <h2>Follow us</h2>
                <FooterFollow/>
            </section>
        </div>
    );
};

export default FooterLinks;