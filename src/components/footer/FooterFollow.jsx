import React from 'react';
import FollowLink from './FollowLink';

const followLinksMass = [
    {id: 1, text: 'Facebook'},
    {id: 2, text: 'Twitter'},
    {id: 3, text: 'Instagram'},
    {id: 4, text: 'YouTube'},
]

const FooterFollow = () => {
    return (
        <ul>
            {followLinksMass.map((item) =>
                <FollowLink
                    text={item.text}
                    key={item.id}
                />
            )}
        </ul>
    );
};

export default FooterFollow;