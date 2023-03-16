import React from 'react';
import s from './post.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-regular-svg-icons'


function Post() {
    return (
        <div className={s.post}>
            <img src={'fromDB'} alt={'avatar'} className={s.avatar}/>
            <div className={s.name}>
                <h3>John GoodBoy</h3>
                <span className={s.time}>time</span>
            </div>
            <div className={s.main}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, velit.</p>
                <button className={s.more}>...more</button>
            </div>
            <span className={s.menu} onClick={'#'}>•••</span>
            <div className={s.settings}>
                <button>
                    Hide from feed
                </button>
                <button>
                    Unfollow
                </button>
            </div>
            <button className={s.fav}>
                <FontAwesomeIcon icon={faStar} />
            </button>
        </div>
    );
}

export default Post;

