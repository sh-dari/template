import React from 'react';
import AccountLink from './AccountLink';

const accountLinksMass = [
    {id: 1, text: 'Sign Up'},
    {id: 2, text: 'Log In'},
    {id: 3, text: 'Subscribe'},
]

const FooterAccount = () => {
    return (
        <ul>
            {accountLinksMass.map((item) =>
                <AccountLink
                    text={item.text}
                    key={item.id}
                />
            )}
        </ul>
    );
};

export default FooterAccount;