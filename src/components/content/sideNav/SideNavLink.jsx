import React from 'react';
import s from "./sideNav.module.css";
import {Link} from "react-router-dom";

function SideNavLink({to, icon, text, state, isActive}) {
    return (
        <p className={isActive ? s.active : undefined}>
            <Link to={to} state={state}>
                    <span className={s.icon}>
                        {icon}
                    </span> {text}
            </Link>
        </p>
    );
}

export default SideNavLink;