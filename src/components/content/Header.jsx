import React from 'react';
import s from './content.module.css'

import logo from '../../images/proPetsGreen.png'
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaw, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";

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

                    <div className={s.buttons}>
                        {!(lastParam === 'lost' || lastParam === 'found' ||
                                lastParam === 'profile' || lastParam === 'lost&foundform')
                            && <Link to={'./newpost'}>
                                <span className={s.newPost}>
                                    <FontAwesomeIcon icon={faPlus}/> New post
                                </span>
                            </Link>}
                        {(lastParam === 'lost' || lastParam === 'found')
                            && <>
                                <Link to={'lost&foundform'} state={{isLost: true}}>
                                    <span className={s.newPost}
                                          style={{backgroundColor: '#FFE18B', color: "black"}}>
                                        <FontAwesomeIcon icon={faSearch}/> I lost a pet
                                    </span>
                                </Link>
                                <Link to={'lost&foundform'} state={{isLost: false}}>
                                    <span className={s.newPost}>
                                       <FontAwesomeIcon icon={faPaw}/> I found a pet
                                    </span>
                                </Link>
                            </>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;