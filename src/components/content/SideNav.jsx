import React from 'react';
import {Link} from "react-router-dom";
import s from './content.module.css'

function SideNav(props) {
    return (
        <div>
            <nav>
                <p><Link to="home">Home</Link></p>
                <p><Link to="profile">Profile</Link></p>
            </nav>
        </div>
    );
}

export default SideNav;