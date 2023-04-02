import './App.css';
import {Route, Routes} from "react-router-dom";
import Landing from "./components/landing/Landing";
import LoginPage from "./components/login/LoginPage";
import Content from "./components/content/Content";
import Home from "./components/content/posts/Home";
import LostFoundForm from "./components/content/LostFound/lostFoundForm/LostFoundForm";
import Hotels from "./components/content/posts/Hotels";
import Walking from "./components/content/posts/Walking";
import Fostering from "./components/content/posts/Fostering";
import VetHelp from "./components/content/posts/VetHelp";
import Favorites from "./components/content/posts/Favorites";
import Profile from "./components/content/profile/Profile";
import React, {useEffect, useState} from "react";
import NewPost from "./components/content/posts/NewPost";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./firebaseConfig";
import {useDispatch} from "react-redux";
import {getUserThunk, setUser} from "./BLL/userSlice";
import LostFound from "./components/content/LostFound/LostFound";
import Loading from "./components/Loading";

function App() {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) return
        dispatch(getUserThunk(user.uid))
    }, [user])

    return (
        <div className="App">
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'content'} element={<Content/>}>
                    <Route index element={<Home/>}/>
                    <Route path={'hotels'} element={<Hotels/>}/>
                    <Route path={'walking'} element={<Walking/>}/>
                    <Route path={'fostering'} element={<Fostering/>}/>
                    <Route path={'vethelp'} element={<VetHelp/>}/>
                    <Route path={'favorites'} element={<Favorites/>}/>

                    <Route path={'newpost'} element={<NewPost/>}/>
                    <Route path={'lost'} element={<LostFound/>}/>
                    <Route path={'found'} element={<LostFound/>}/>
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
