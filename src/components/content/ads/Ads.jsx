import React from 'react';

import ad1 from '../../../images/ads/ad1.png'
import ad2 from '../../../images/ads/ad2.png'
import ad3 from '../../../images/ads/ad3.png'

import s from './ads.module.css'

function Ads(props) {
    return (
        <div className={s.ads}>
            <img src={ad1} alt=""/>
            <img src={ad2} alt=""/>
            <img src={ad3} alt=""/>
        </div>
    );
}

export default Ads;