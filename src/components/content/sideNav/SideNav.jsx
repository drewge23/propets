import React, {useState} from 'react';
import s from './sideNav.module.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faBullhorn,
    faDog,
    faHome,
    faHotel,
    faPaw,
    faPersonWalking,
    faSearch,
    faStar, faStethoscope
} from '@fortawesome/free-solid-svg-icons'
import SideNavLink from "./SideNavLink";
import {Link} from "react-router-dom";

import PLACEHOLDER from '../../../images/allPets.png'

function SideNav(props) {
    const [active, setActive] = useState(0)

    const servicesChildren = [
        {
            to: 'hotels',
            icon: <FontAwesomeIcon icon={faHotel}/>,
            text: 'Hotels',
        }, {
            to: 'fostering',
            icon: <FontAwesomeIcon icon={faPersonWalking}/>,
            text: 'Fostering',
        }, {
            to: 'walking',
            icon: <FontAwesomeIcon icon={faDog}/>,
            text: 'Walking',
        }, {
            to: 'vethelp',
            icon: <FontAwesomeIcon icon={faStethoscope}/>,
            text: 'Vet Help',
        },]

    const linkArray = [
        {
            to: 'home',
            icon: <FontAwesomeIcon icon={faHome}/>,
            text: 'Home',
            state: null,
            children: null,
        }, {
            to: 'lost&found',
            icon: <FontAwesomeIcon icon={faSearch}/>,
            text: 'Lost',
            state: {isLost: true},
            children: null,
        }, {
            to: 'lost&found',
            icon: <FontAwesomeIcon icon={faPaw}/>,
            text: 'Found',
            state: {isLost: false},
            children: null,
        }, {
            to: 'services',
            icon: <FontAwesomeIcon icon={faBullhorn}/>,
            text: 'Services',
            state: null,
            children: servicesChildren,
        }, {
            to: 'favorites',
            icon: <FontAwesomeIcon icon={faStar}/>,
            text: 'Favorites',
            state: null,
            children: null,
        }]

    return (
        <>
            <nav className={s.sideNav}>
                {linkArray.map((link, index) => (
                    <SideNavLink {...link} isActive={index === active}
                                 key={index} setActive={setActive} index={index}/>
                ))}
                <div className={s.profile}>
                    <img src={PLACEHOLDER} alt="AA"/>
                    <SideNavLink to={'profile'} isActive={active === -1} setActive={setActive} index={-1}
                                 text={'Abygale abbot'}/>
                </div>

                <p className={s.logout}>
                    <Link to={'#'} onClick={() => null}>
                    <span className={s.icon}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                    </span> Logout
                    </Link>
                </p>
            </nav>
        </>
    );
}

export default SideNav;