import React from 'react';
import {logo,puppy,allPets, lensPawBig} from "../../utils/constants";
import {Link} from "react-router-dom";
import s from "./landing.module.css"
import FooterLanding from "./FooterLanding";

function Landing(props) {
    return (
        <div>
            <div className={s.header}>
                    <img src={logo} alt={'ProPets'} />
                    <Link to={'login'}><button>Sign in</button></Link>
            </div>

            <div className={s.first}>
                <section className={s.right}>
                    <p className={s.welcome}>Welcome to your <span>pawfessional</span> community</p>
                    <p className={s.btnOne}>
                        <Link to={'login'}>
                            <button>I lost my pet!</button>
                            <img src={lensPawBig} alt={'icon loops'}/>
                        </Link>
                    </p>
                    <p className={s.btnTwo}>
                        <Link to={'login'}>
                            <button>I found a pet!</button>
                        </Link>
                    </p>
                    <p className={s.text}>I’m okay, just want to <Link to={'login'} className={s.join}>JOIN</Link> the pawsome community!</p>
                </section>
                <section className={s.left}>
                    <img src={puppy} alt={'dog'}/>
                </section>
            </div>

            <div className={s.second}>
                <p>Our fluffy space for lovers, admirers, dads and moms of our four-legged, winged, tailed guys.</p>
            </div>

            <div className={s.third}>
                <div className={s.right}>
                    <img src={allPets} alt={'allPets'}/>
                </div>
                <div className={s.left}>
                    <p>Here is collected everything that your pet needs:</p>
                    <ul>
                        <li>professional veterinarian tips;</li>
                        <li>useful information about education and care;</li>
                        <li>fostering home search;</li>
                        <li>information about pet-sitting and walking service;</li>
                        <li>and of course, great communication with new friends in your social network!</li>
                    </ul>
                </div>
            </div>
            <div className={s.fourth}>
                <p>Coming soon</p>
                <span>We are planing to open a new service, where your cats and dogs can find their love!</span>
                <div className={s.love}>
                    LOVE
                </div>
            </div>
            <FooterLanding/>
        </div>
    );
}

export default Landing;