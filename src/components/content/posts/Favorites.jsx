import React, {useEffect, useState} from 'react';
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db} from "../../../firebaseConfig";

function Favorites(props) {

    const currentUserId = auth.currentUser.uid
    const [favPostIds] = useCollection(db.collection('subscriptions').where('userId', '==', currentUserId))
    const [posts] = useCollection(db.collection('posts'))
    const [favPosts, setFavPosts] = useState(null)

    useEffect(()=> {
        if (posts && favPostIds) {
            const temp = {docs: null}
            temp.docs = posts.docs.filter(doc => favPostIds.docs[0].data().favorites.includes(doc.id))
            console.log(temp.docs)
            setFavPosts(temp)
        }
    },[posts, favPostIds])


    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (favPosts && favPosts.docs){
            setLoading(false)
        }
    },[favPosts])


    return (
        <div>
            {favPosts && console.log(favPosts.docs)}
            {
                !loading
                    ? <Posts title={''} posts={favPosts}/>
                    : <p>Loading...</p>
            }
        </div>
    )
}

export default Favorites;