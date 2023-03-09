import React, {useState} from 'react';
import s from "./sideNav.module.css";
import {Link} from "react-router-dom";

function SideNavLink({to, icon, text, state, isActive, setActive, index, children}) {
    const [subActive, setSubActive] = useState(0)

    return (
        <div className={(children && isActive) ? s.hasChildren : undefined}>
            <div onClick={() => setActive(index)}
                 className={isActive ? s.activeContainer : undefined}>
                <p className={isActive ? s.active : undefined}>
                    <Link to={to} state={state}>
                    <span className={s.icon}>
                        {icon}
                    </span> {text}
                    </Link>
                </p>
            </div>
            {children && isActive && children.map((child, index) =>
                (<p className={index === subActive ? s.subActive : undefined}
                    onClick={() => setSubActive(index)}>
                    <Link to={child.to}>
                    <span className={s.icon}>
                        {child.icon}
                    </span> {child.text}
                    </Link>
                </p>))}
        </div>
    );
}

export default SideNavLink;