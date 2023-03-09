import React, {useState} from 'react';
import {Link} from "react-router-dom";
import s from './sideNav.module.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBullhorn, faHome, faPaw, faSearch, faStar} from '@fortawesome/free-solid-svg-icons'
import SideNavLink from "./SideNavLink";

function SideNav(props) {
    const [active, setActive] = useState(0)

    const linkArray = [{
        to: 'home',
        icon: <FontAwesomeIcon icon={faHome}/>,
        text: 'Home',
        state: null,
    }, {
        to: 'lost&found',
        icon: <FontAwesomeIcon icon={faSearch}/>,
        text: 'Lost',
        state: {isLost: true},
    }, {
        to: 'lost&found',
        icon: <FontAwesomeIcon icon={faPaw}/>,
        text: 'Found',
        state: {isLost: false},
    }, {
        to: 'services',
        icon: <FontAwesomeIcon icon={faBullhorn}/>,
        text: 'Services',
        state: null,
    }, {
        to: 'favorites',
        icon: <FontAwesomeIcon icon={faStar}/>,
        text: 'Favorites',
        state: null,
    }]

    return (
        <nav className={s.sideNav}>
            {linkArray.map((link,index) => (
                <SideNavLink {...link} isActive={index === active}/>
            ))}
        </nav>
    );
}

export default SideNav;