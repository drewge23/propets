import React from 'react';
import s from './content.module.css'

import logo from '../../images/proPetsGreen.png'
import {useLocation} from "react-router";
import {Link} from "react-router-dom";

function Header(props) {
    const location = useLocation()
    const lastParam = function () {
        let tempArr = location.pathname.split('/')
        return tempArr[tempArr.length - 1]
    }()

    return (
        <div className={s.header}>
            <div className={s.container}>
                <div className={s.headerLogo}>
                    <img src={logo} alt=""/>

                    <div>
                        {!(lastParam === 'lost' || lastParam === 'found' ||
                                lastParam === 'profile' || lastParam === 'lost&foundform')
                            && <Link to={'./newpost'}>
                                <span style={{backgroundColor: 'lightblue', padding: 10}}>New post</span>
                            </Link>}
                        {(lastParam === 'lost' || lastParam === 'found')
                            && <>
                                <Link to={'lost&foundform'} state={{isLost: true}}>
                                    <span style={{backgroundColor: 'yellow', padding: 10}}>I lost a pet</span>
                                </Link>
                                <Link to={'lost&foundform'} state={{isLost: false}}>
                                    <span style={{backgroundColor: 'green', padding: 10}}>I found a pet</span>
                                </Link>
                            </>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;