import React from 'react';
import HelpLink from './HelpLink';

const helpLinksMass = [
    {id: 1, text: 'Track My Music'},
    {id: 2, text: 'Community Support'},
    {id: 3, text: 'Community Guidelines'},
    {id: 4, text: 'Help'},
]

const FooterHelp = () => {
    return (
        <ul>
            {helpLinksMass.map((item) =>
                <HelpLink
                    text={item.text}
                    key={item.id}
                />
            )}
        </ul>
    );
};

export default FooterHelp;