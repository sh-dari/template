import React from 'react';
import AboutLink from './AboutLink';

const footerAboutMass = [
    {id: 1, text: 'Terms of Use'},
    {id: 2, text: 'Privacy Policy'},
    {id: 3, text: 'Legal Policies'},
    {id: 4, text: 'Cookies Policy'},
    {id: 5, text: 'Cookie Information'},
    {id: 6, text: 'Jobs at ViacomCBS'},
    {id: 7, text: 'Last.fm Music'},
]

const FooterAbout = () => {
    return (
        <div className="footer__about">
            <p>CBS Interactive © 2022 Last.fm Ltd. All rights reserved</p>
            <ul>
                {footerAboutMass.map((item) =>
                    <AboutLink
                        text={item.text}
                        key={item.id}
                    />
                )}
            </ul>
        </div>
    );
};

export default FooterAbout;