import React from 'react';
import LanguageLink from './LanguageLink';

const footerLanguageMass = [
    {id: 1, text: 'Deutsch'},
    {id: 2, text: 'Español'},
    {id: 3, text: 'Français'},
    {id: 4, text: 'Italiano'},
    {id: 5, text: '日本語'},
    {id: 6, text: 'Polski'},
    {id: 7, text: 'Português'},
    {id: 8, text: 'Русский'},
    {id: 9, text: 'Svenska'},
    {id: 10, text: 'Türkçe'},
    {id: 11, text: '简体中文'},
]

const FooterLanguage = () => {
    return (
        <div className="footer__language">
            <ul>
                <li><a href="#" className="footer__link link">English</a></li>
                {footerLanguageMass.map((item) =>
                    <LanguageLink
                        text={item.text}
                        key={item.id}
                    />
                )}
            </ul>
        </div>
    );
};

export default FooterLanguage;