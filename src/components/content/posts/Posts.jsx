import React, {useEffect, useState} from 'react';
import Post from "./Post";
import {auth, db} from "../../../firebaseConfig";
import {useDocument} from "react-firebase-hooks/firestore";
import Loading from "../../Loading";

function Posts({posts, type}) {

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
        if (!hiddenPostIds.docs && !unfollowedUserIds.docs && !displayedPosts.docs.length) return

        const temp = {docs: []}
        temp.docs = displayedPosts.docs
            .filter(doc => !unfollowedUserIds?.includes(doc.data().userId))
            .filter(doc => !hiddenPostIds?.includes(doc.id))
        setDisplayedPosts(temp)
    }, [hiddenPostIds, unfollowedUserIds])

    return (
        <div>
            {loadingSubs
                ? <Loading />
                : displayedPosts.docs.length
                    ? displayedPosts.docs
                        .sort((a, b) => b.data().createdAt.seconds - a.data().createdAt.seconds)
                        .map(post => (
                                <Post {...post.data()} key={post.id} postId={post.id}/>
                        ))
                    : <p>No posts</p>
            }
        </div>
    );
}

export default Posts;
