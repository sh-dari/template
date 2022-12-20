import React from 'react';
import TabLink from './TabLink';

const tabsLinksMass = [
    {id: 1, text: 'Artists', href: 'https://www.last.fm/search/artists'},
    {id: 2, text: 'Albums', href: 'https://www.last.fm/search/albums'},
    {id: 3, text: 'Tracks', href: 'https://www.last.fm/search/tracks'},
]

const Tabs = () => {
    return (
        <div className="tabs">
            {tabsLinksMass.map((item) =>
                <TabLink
                    text={item.text}
                    key={item.id}
                    href={item.href}
                />
            )}
        </div>
    );
};

export default Tabs;