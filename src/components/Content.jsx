import {Link, Outlet, Route, Routes} from "react-router-dom";
import Header from "./main/Header";
import SideNav from "./main/SideNav";
import Home from "./main/Home";
import LostFound from "./main/LostFound";
import Hotels from "./main/Hotels";
import Walking from "./main/Walking";
import Fostering from "./main/Fostering";
import VetHelp from "./main/VetHelp";
import Favorites from "./main/Favorites";
import Profile from "./main/Profile";
import Ads from "./main/Ads";
import React from "react";

function Content() {
    return (
        <>
            <h1>Content</h1>
            <Header/>
            <SideNav/>
            <Outlet />
            <Ads/>
        </>
    )
        ;
}

export default Content