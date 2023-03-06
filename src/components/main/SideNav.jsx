import React from 'react';
import {Link} from "react-router-dom";

function SideNav(props) {
    return (
        <nav>
            <p><Link to="home">Home</Link></p>
            <p><Link to="profile">Profile</Link></p>
        </nav>
    );
}

export default SideNav;