import React from 'react';
import {logoBig} from "../../utils/constants";
import {
    faDog,
    faHotel,
    faPaw,
    faPersonWalking,
    faSearch,
    faStethoscope,
} from '@fortawesome/free-solid-svg-icons'
import {
    faFacebook,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'
import s from "./footerLanding.module.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


function FooterLanding() {

    const iconsArray = [
        {
            to: 'Lost',
            icon: <FontAwesomeIcon icon={faSearch}/>
        },
        {
            to: 'Found',
            icon: <FontAwesomeIcon icon={faPaw}/>
        },
        {
            to: 'VetHelp',
            icon: <FontAwesomeIcon icon={faStethoscope}/>
        }, {
            to: 'Hotels',
            icon: <FontAwesomeIcon icon={faHotel}/>
        }, {
            to: 'Walking',
            icon: <FontAwesomeIcon icon={faPersonWalking}/>
        }, {
            to: 'Fostering',
            icon: <FontAwesomeIcon icon={faDog}/>
        }
    ]

    return (
        <footer>
            <div className={s.container}>
                <img src={logoBig} alt={'proPets'}/>
                <div className={s.social}>
                    <p className={s.brands}>
                        <FontAwesomeIcon icon={faFacebook}/>
                        <FontAwesomeIcon icon={faInstagram}/>
                    </p>
                    <p>1600 Amphitheatre Pkwy Mountain View, CA 94043, USA</p>
                </div>
                <div className={s.icons}>
                    {iconsArray.map((item, index) => (
                        <p index={index} key={index}>{item.icon} {item.to}</p>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default FooterLanding;