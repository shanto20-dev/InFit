import React from 'react'
import Carousel from './carousel'

import '../../styles/landing_page/landing_page.css'

import LogoWhite from "../../assets/InfitLogoWhite.png"
import suitImpala from "../../assets/InfitImpalaBody.png"
import dressImpala from "../../assets/InfitImpalaDress.png"

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <img className="suit-impala" src={suitImpala} alt=""/>
                <img className="dress-impala" src={dressImpala} alt=""/>
                <Carousel />
                <div className="message">
                    <p>Whether you are looking to expand your wardrobe, find trending outfits, or simply plan your own outfits. InFit gives you a simple and fun way to plan, edit, and share clothing and outfits with your friends and family</p>
                </div>
                <div className="bottom-div-container">
                    <div className="bottom-div">
                        <div className="column">
                            <h2>Devs</h2>
                            <ul>
                                <li>Parth Shah</li>
                                <li>Sayeef Alam</li>
                                <li>Lakhte Agha</li>
                                <li>Ariton Sefedini</li>
                            </ul>
                        </div>
                        <div className="column">
                            <h2>Technologies</h2>
                            <ul>
                                <li>React</li>
                                <li>MongoDB</li>
                                <li>Express</li>
                                <li>Node.js</li>
                            </ul>
                        </div>
                        <div className="column">
                            <ul>
                                <li><img src={LogoWhite} alt=""/></li>
                                <li>Copyright © 2021 Infit Inc</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
