import React from 'react';
import GoodiesLink from './GoodiesLink';

const goodiesLinksMass = [
    {id: 1, text: 'Download Scrobbler'},
    {id: 2, text: 'Developer API'},
    {id: 3, text: 'Free Music Downloads'},
    {id: 4, text: 'Merchandise'},
]

const FooterGoodies = () => {
    return (
        <ul>
            {goodiesLinksMass.map((item) =>
                <GoodiesLink
                    text={item.text}
                    key={item.id}
                />
            )}
        </ul>
    );
};

export default FooterGoodies;