import React from 'react';
import NavLink from './NavLink';

const navLinksMass = [
    {id: 1, text: 'Live'},
    {id: 2, text: 'Music'},
    {id: 3, text: 'Charts'},
    {id: 4, text: 'Events'},
    {id: 5, text: 'Features'},
]

const NavLinks = () => {
    return (
        <div>
            {navLinksMass.map((item) =>
                <NavLink
                    text={item.text}
                    key={item.id}
                />
            )}
        </div>
    );
};

export default NavLinks;