import './App.css';
import {Route, Routes} from "react-router-dom";
import Landing from "./components/landing/Landing";
import LoginPage from "./components/login/LoginPage";
import Content from "./components/content/Content";
import Home from "./components/content/posts/Home";
import LostFoundForm from "./components/content/lostFoundForm/LostFoundForm";
import Hotels from "./components/content/posts/Hotels";
import Walking from "./components/content/posts/Walking";
import Fostering from "./components/content/posts/Fostering";
import VetHelp from "./components/content/posts/VetHelp";
import Favorites from "./components/content/posts/Favorites";
import Profile from "./components/content/profile/Profile";
import React, {useEffect} from "react";
import NewPost from "./components/content/NewPost";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebaseConfig";
import {useDispatch} from "react-redux";
import {setUser} from "./BLL/userSlice";
import LostFound from "./components/content/LostFound";

// const routes = [
//     {
//         path: 'home',
//         type: 'home',
//         title: ''
//     },
//     {
//         path: 'hotels',
//         type: 'hotels',
//         title: 'Hotels. Go to vacations — we’ll take care of your pet!'
//     },
//     {
//         path: 'walking',
//         type: 'walking',
//         title: 'Walking. No time tonight? We have a solution!'
//     },
//     {
//         path: 'fostering',
//         type: 'fostering',
//         title: 'Fostering. In adoption we trust.'
//     },
//     {
//         path: 'vethelp',
//         type: 'vethelp',
//         title: 'VetHelp. They deserve it.'
//     },
//     {
//         path: 'favorites',
//         type: 'favorites',
//         title: 'Your favorites. Find them here anytime.'
//     },
// ]

function App() {
    const [user] = useAuthState(auth)
    console.log(user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) return
        dispatch(setUser({
            userId: user.uid,
            photoUrl: user.photoURL,
            displayName: user.displayName,
            email: user.email,
            facebook: null,
            phone: user.phoneNumber,
        }))
    }, [user])

    return (
        <div className="App">
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'content'} element={<Content/>}>
                    <Route index element={<Home/>}/>
                    {/*{routes.map(route => (*/}
                    {/*    <Route path={route.path} element={<Posts type={route.type} title={route.title}/>}/>*/}
                    {/*))}*/}
                    <Route path={'hotels'} element={<Hotels/>}/>
                    <Route path={'walking'} element={<Walking/>}/>
                    <Route path={'fostering'} element={<Fostering/>}/>
                    <Route path={'vethelp'} element={<VetHelp/>}/>
                    <Route path={'favorites'} element={<Favorites/>}/>

                    <Route path={'newpost'} element={<NewPost/>}/>
                    <Route path={'lost&found'} element={<LostFound/>}/>
                    <Route path={'lost&foundform'} element={<LostFoundForm/>}/>
                    <Route path={'profile'} element={<Profile/>}/>
                    <Route path={'*'} element={<Home/>}/>
                </Route>
                <Route path={'*'} element={<Landing/>}/>
            </Routes>
        </div>
    );
}

export default App;
