import React from 'react';
import {logo,logoBig,puppy,allPets, lensPawBig} from "../../utils/constants";
import {smallIcons} from "../../utils/constants";
import {Link} from "react-router-dom";
import s from "./landing.module.css"

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
                <section className={'right'}>
                    <img src={allPets} alt={'allPets'}/>
                </section>
                <section className={'left'}>
                    <h3>Here is collected everything that your pet needs:</h3>
                    <ul>
                        <li>professional veterinarian tips;</li>
                        <li>useful information about education and care; fostering home search;</li>
                        <li>information about pet-sitting and walking service;</li>
                        <li>and of course, great communication with new friends in your social network!</li>
                    </ul>
                </section>
            </div>
            <div className={s.fourth}>
                <h1>Comming soon</h1>
                <span>We are planing to open a new service, where your cats and dogs can find their love!</span>
                <span>LOVE</span>
                <img src={smallIcons[1]} alt={'love'}/>
            </div>
            <footer>
                <img src={logoBig} alt={'proPets'}/>
                <div>
                    <p>
                        <span>FB</span>
                        <span>INST</span>
                    </p>
                    <p>1600 Amphitheatre Pkwy Mountain View, CA 94043, USA</p>
                </div>
                <div>
                    <div>
                        <p>
                            <img src={smallIcons[0]} alt={'i'}/>
                            Lost
                        </p>
                        <p>
                            <img src={smallIcons[7]} alt={'i'}/>
                            Found
                        </p>
                        <p>
                            <img src={smallIcons[2]} alt={'i'}/>
                            VetHelp
                        </p>
                    </div>
                    <div>
                        <p>
                            <img src={smallIcons[4]} alt={'i'}/>
                            Hotels
                        </p>
                        <p>
                            <img src={smallIcons[6]} alt={'i'}/>
                            Walking
                        </p>
                        <p>
                            <img src={smallIcons[3]} alt={'i'}/>
                            Fostering
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;