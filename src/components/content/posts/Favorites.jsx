import React, {useEffect, useState} from 'react';
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db} from "../../../firebaseConfig";

function Favorites(props) {

    const currentUserId = auth.currentUser.uid
    const [subsPostIds] = useCollection(db.collection('subscriptions').where('userId', '==', currentUserId))
    const [posts, loading] = useCollection(db.collection('posts'))
    const [favPosts, setFavPosts] = useState(null)
    const [favPostIds, setFavPostIds] = useState(null)

    useEffect(()=>{
        // console.log(subsPostIds.docs[0]?.data().favorites)
        if (subsPostIds){
            setFavPostIds(subsPostIds.docs[0]?.data().favorites)
        }
    }, [subsPostIds])

    useEffect(()=> {
        if (posts && favPostIds) {
            const temp = {docs: null}
            temp.docs = posts.docs.filter(doc => favPostIds.includes(doc.id))
            setFavPosts(temp)
        }
    },[posts, favPostIds])

    //
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     if (favPosts && favPosts.docs){
    //         setLoading(false)
    //     }
    // },[favPosts])


    return (
        <div>
            {
                loading
                    ? <p>Loading...</p>
                    : favPosts && favPostIds.length !== 0
                        ? <Posts title={''} posts={favPosts}/>
                        : <p> No favorites!</p>
            }
        </div>
    )
}

export default Favorites;