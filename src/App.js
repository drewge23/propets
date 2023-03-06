import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Landing from "./components/Landing";
import LoginPage from "./components/LoginPage";
import Content from "./components/Content";
import Home from "./components/main/Home";
import LostFound from "./components/main/LostFound";
import Hotels from "./components/main/Hotels";
import Walking from "./components/main/Walking";
import Fostering from "./components/main/Fostering";
import VetHelp from "./components/main/VetHelp";
import Favorites from "./components/main/Favorites";
import Profile from "./components/main/Profile";
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
