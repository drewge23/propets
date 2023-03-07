import React from 'react';
import {Link} from "react-router-dom";
import s from './content.module.css'

function SideNav(props) {
    return (
        <div>
            <nav>
                <p><Link to="lost&found" state={{isLost: true}}>Lost</Link></p>
                <p><Link to="lost&found" state={{isLost: false}}>Found</Link></p>
            </nav>
        </div>
    );
}

export default SideNav;