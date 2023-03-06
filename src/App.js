import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Landing from "./components/landing/Landing";
import Content from "./components/Content";
import Home from "./components/content/Home";
import LostFound from "./components/content/LostFound";
import Hotels from "./components/content/Hotels";
import Walking from "./components/content/Walking";
import Fostering from "./components/content/Fostering";
import VetHelp from "./components/content/VetHelp";
import Favorites from "./components/content/Favorites";
import Profile from "./components/content/Profile";
import React from "react";

function App() {
    return (
        <div className="App">
            <nav>
                <p><Link to="/login">Login</Link></p>
                <p><Link to="/content">Content</Link></p>
                <p><Link to="/sjxcbxmhc">ashbdcsnhbcn</Link></p>
            </nav>
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
