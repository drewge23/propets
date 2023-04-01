import React, {useEffect, useState} from 'react';
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

    // const [locations, setLocations] = useState([])
    // useEffect(()=>{
    //     if (posts){
    //         setLocations(posts.docs.filter(post => post.data()?.coords?.lat != null))
    //     }
    //     console.log(locations)
    // },[posts])

    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [features, setFeatures] = useState('')
    const [place, setPlace] = useState('')

    const filteredPosts = posts
        ? posts.docs
            .filter(post => {
                return type === 'Any'
                    ? true
                    : post.data().type?.includes(type.trim())
            })
            .filter(post => post.data().breed.includes(breed.trim()))
            .filter(post => post.data().distinctive_features.includes(features.trim()))
            .filter(post => post.data().location.includes(place.trim()))
        : undefined

    return (
        <div>
            <div className={s.filters}>
                <select name={'Type'} value={type}
                        onChange={(e) => setType(e.target.value)}>
                    <option>Any</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bunny</option>
                    <option>Snake</option>
                    <option>Parrot</option>
                    <option>Other</option>
                </select>
                <input placeholder={'Breed'}
                       value={breed} onChange={(e) => setBreed(e.target.value)}/>
                <input placeholder={'Distinctive features'}
                       value={features} onChange={(e) => setFeatures(e.target.value)}/>
                <input placeholder={'Location'}
                       value={place} onChange={(e) => setPlace(e.target.value)}/>
            </div>
            <div className={s.main}>
                <div>
                    {posts && filteredPosts && filteredPosts
                        .sort((a, b) => b.data().createdAt?.seconds - a.data().createdAt?.seconds)
                        .map(post => <LostFoundPost post={post.data()}
                                                    postId={post.id}
                                                    key={post.id}/>)}
                </div>
            </div>
            {posts && <Map posts={posts}/>}
        </div>
    );
}

export default LostFound;