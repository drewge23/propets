import React, {useEffect, useState} from 'react';
import Posts from "./Posts";
import {useCollection, useDocument} from "react-firebase-hooks/firestore";
import {auth, db} from "../../../firebaseConfig";

function Home() {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'home'))

    const currentUserId = auth.currentUser.uid
    const [subsPostIds, loadingSubs] = useDocument(db.collection('subscriptions').doc(currentUserId))
    const [hiddenPostIds, setHiddenPostIds] = useState([])
    const [unfollowedUserIds, setUnfollowedUserIds] = useState([])
    const [displayedPosts, setDisplayedPosts] = useState({docs: []})

    useEffect(() => {
        if (subsPostIds) {
            setHiddenPostIds(subsPostIds.data()?.hidden || [])
            setUnfollowedUserIds(subsPostIds.data()?.unfollowed || [])
        }
    }, [subsPostIds])

    useEffect(() => {
        if (!posts) return
        const temp = {docs: []}
        temp.docs = posts.docs
            .filter(doc => !unfollowedUserIds?.includes(doc.data().userId))
            .filter(doc => !hiddenPostIds?.includes(doc.id))
        setDisplayedPosts(temp)
    }, [posts])

    useEffect(() => {
        const temp = {docs: []}
        temp.docs = displayedPosts.docs
            .filter(doc => !unfollowedUserIds?.includes(doc.data().userId))
            .filter(doc => !hiddenPostIds?.includes(doc.id))
        setDisplayedPosts(temp)
    }, [hiddenPostIds, unfollowedUserIds])

    return (
        <>
            {
                loadingSubs
                    ? <p>Loading...</p>
                    : displayedPosts
                        ? <Posts title={''} posts={displayedPosts}/>
                        : <p>No posts</p>
            }
        </>
    )
}

export default Home;