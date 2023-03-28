import React from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";
import LostFoundPost from "./LostFoundPost";
import {useLocation} from "react-router";
import Map from "./Map";
import s from './lostFoundContent.module.css'

function LostFound(props) {
    const location = useLocation()
    const lastParam = function () {
        let tempArr = location.pathname.split('/')
        return tempArr[tempArr.length - 1]
    }()

    const [posts] = useCollection(
        db.collection('lost_and_found').where('status', '==', lastParam)
    )

    return (
        <div>
            <div className={s.filters}>
                <select name={'Type'}>
                    <option>Type</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bunny</option>
                    <option>Snake</option>
                    <option>Parrot</option>
                    <option>Other</option>
                </select>
                <input placeholder={'Breed'}/>
                <input placeholder={'Distinctive features'}/>
                <input placeholder={'Location'}/>
                {/*<Autocomplete isLoaded={isLoaded}/>*/}
            </div>
            <div className={s.main}>
                <div>
                    {posts && posts.docs
                    	.sort((a, b) => b.data().createdAt?.seconds - a.data().createdAt?.seconds)
                    	.map(post => <LostFoundPost post={post.data()}
                                                                    postId={post.id}
                                                                    key={post.id}/>)}
                </div>
                <Map/>
            </div>
        </div>
    );
}

export default LostFound;