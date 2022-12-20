import React from 'react';
import CompanyLink from './CompanyLink';

const companyLinksMass = [
    {id: 1, text: 'About Last.fm'},
    {id: 2, text: 'Contact Us'},
    {id: 3, text: 'Jobs'},
]

const FooterCompany = () => {
    return (
        <ul>
            {companyLinksMass.map((item) =>
                <CompanyLink
                    text={item.text}
                    key={item.id}
                />
            )}
        </ul>
    );
};

export default FooterCompany;