import {Outlet} from "react-router-dom";
import Header from "./Header";
import SideNav from "./sideNav/SideNav";
import Ads from "./ads/Ads";
import React from "react";
import s from './content.module.css'

function Content() {
    return (
        <div className={s.content}>
            <Header/>
            <div className={`${s.mainBg}`}>
                <div className={`${s.main}`}>
                    <div className={s.sidenav}>
                        <SideNav/>
                    </div>
                    <div className={s.outlet}>
                        <Outlet/>
                    </div>
                    <div className={s.ads}>
                        <Ads/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content