import {Navigate, Outlet} from "react-router-dom";
import Header from "./Header";
import SideNav from "./sideNav/SideNav";
import Ads from "./ads/Ads";
import React from "react";
import s from './content.module.css'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebaseConfig";
import {useLocation} from "react-router";
import Map from "./LostFound/Map";

function Content() {
    const [user] = useAuthState(auth)
    const location = useLocation()
    const lastParam = function () {
        let tempArr = location.pathname.split('/')
        return tempArr[tempArr.length - 1]
    }()

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
                        {!(lastParam === 'lost' || lastParam === 'found')
                            &&  <div className={s.ads}>
                                    <Ads/>
                                </div>}
                        {(lastParam === 'lost' || lastParam === 'found')
                            && <div className={s.ads}>
                                <Map/>
                        </div>}

                        </div>
                </div>
            </div>}
            {!user && <Navigate to={'/login'}/>}
        </>
    )
}

export default Content