import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Landing from "./components/landing/Landing";
import LoginPage from "./components/login/LoginPage";
import Content from "./components/content/Content";
import Home from "./components/content/Home";
import LostFound from "./components/content/lostFound/LostFound";
import Hotels from "./components/content/Hotels";
import Walking from "./components/content/Walking";
import Fostering from "./components/content/Fostering";
import VetHelp from "./components/content/VetHelp";
import Favorites from "./components/content/Favorites";
import Profile from "./components/content/profile/Profile";
import React from "react";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'content'} element={<Content />}>
                    <Route index element={<Home/>}/>
                    <Route path={'home'} element={<Home/>}/>
                    <Route path={'lost&found'} element={<LostFound/>}/>
                    <Route path={'hotels'} element={<Hotels/>}/>
                    <Route path={'walking'} element={<Walking/>}/>
                    <Route path={'fostering'} element={<Fostering/>}/>
                    <Route path={'vethelp'} element={<VetHelp/>}/>
                    <Route path={'favorites'} element={<Favorites/>}/>
                    <Route path={'profile'} element={<Profile/>}/>
                    <Route path={'*'} element={<Home/>}/>
                </Route>
                <Route path={'*'} element={<Landing/>}/>
            </Routes>
        </div>
    );
}

export default App;
