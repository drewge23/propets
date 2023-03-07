import React from 'react';
import s from './content.module.css'

import logo from '../../images/proPetsGreen.png'

function Header(props) {
    return (
        <div className={s.header}>
            <div className={s.container}>
                <div className={s.headerLogo}>
                    <img src={logo} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Header;