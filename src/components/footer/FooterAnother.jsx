import React from 'react';
import FooterAbout from './FooterAbout';
import FooterLanguage from './FooterLanguage';

const FooterAnother = () => {
    return (
        <div className="footer__another">
            <div className="footer__info">
                <FooterLanguage/>
                <div className="footer__timezon">
                    <p>Time zone: Europe/Moscow</p>
                </div>
                <FooterAbout/>
            </div>
            <div className="footer__audio">
                <span>Audioscrobbler</span>
                <img src="/imgs/footer_logo.png" width="37" alt=""/>
            </div>
        </div>
    );
};

export default FooterAnother;