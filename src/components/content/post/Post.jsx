import React from 'react';
import s from './post.module.css'

function Post() {
    return (
        <div className={s.post}>
            <img src={'fromDB'} alt={'avatar'} className={s.avatar}/>
            <div className={s.main}>
                <h3 className={s.name}>John GoodBoy</h3>
                <span className={s.time}>time</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, velit.</p>
                <button className={s.more}>...more</button>
            </div>
            <div>
                <button className={s.menu}>...</button>
                <div className={s.settings}>
                    <button>
                        Hide from feed
                    </button>
                    <button>
                        Unfollow
                    </button>
                </div>
                <button className={s.fav}>fav</button>
            </div>
        </div>
    );
}

export default Post;

