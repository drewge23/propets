import React from 'react';
import {logoBig, smallIcons} from "../../utils/constants";
import {
    faDog,
    faHotel,
    faPaw,
    faPersonWalking,
    faSearch,
    faStethoscope
} from '@fortawesome/free-solid-svg-icons'
import s from "./footerLanding.module.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


function FooterLanding(props) {

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
        },        {
            to: 'Hotels',
            icon: <FontAwesomeIcon icon={faHotel}/>
        },        {
            to: 'Walking',
            icon: <FontAwesomeIcon icon={faPersonWalking}/>
        },        {
            to: 'Fostering',
            icon: <FontAwesomeIcon icon={faDog}/>
        }
    ]




    return (
        <footer>
            <img src={logoBig} alt={'proPets'}/>
            <div className={s.center}>
                <p>
                    <span>FB </span>
                    <span>INST</span>
                </p>
                <p>1600 Amphitheatre Pkwy Mountain View, CA 94043, USA</p>
            </div>
            <div className={s.icons}>
                {iconsArray.map((item, index) => (
                    <p index={index} key={index}>{item.icon} {item.to}</p>
                ))}
            </div>
        </footer>
    );
}

export default FooterLanding;