import {Navigate, Outlet} from "react-router-dom";
import Header from "./Header";
import SideNav from "./sideNav/SideNav";
import Ads from "./ads/Ads";
import React from "react";
import s from './content.module.css'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebaseConfig";

function Content() {
    const [user] = useAuthState(auth)

    return (
        <>
            {user && <div className={s.content}>
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
            </div>}
            {!user && <Navigate to={'/login'}/>}
        </>
    )
}

export default Content