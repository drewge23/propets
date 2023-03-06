import {Link, Outlet, Route, Routes} from "react-router-dom";
import Header from "./content/Header";
import SideNav from "./content/SideNav";
import Home from "./content/Home";
import LostFound from "./content/LostFound";
import Hotels from "./content/Hotels";
import Walking from "./content/Walking";
import Fostering from "./content/Fostering";
import VetHelp from "./content/VetHelp";
import Favorites from "./content/Favorites";
import Profile from "./content/Profile";
import Ads from "./content/Ads";
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