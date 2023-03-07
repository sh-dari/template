import React from 'react';

const TabLink = ({text, href}) => {
    return (
        <a href={href} className="tab" target="_blank">{text}</a>
    );
};

export default TabLink;