import React, { Component } from 'react'

import defaultProfPic from '../../assets/icons/whiteInfitImpala.png'
import '../../styles/closet/overview.css'

export default class Overview extends Component {

    constructor(props) {
        super(props)

        this.caclulateStats = this.caclulateStats.bind(this)
    }

    caclulateStats() {
        if (this.props.clothing && this.props.outfits) {
            let counts = {};
            Object.values(this.props.clothing).forEach(cloth => {
                cloth.tags.forEach(tag => {
                    if (Object.keys(counts).includes(tag)) {
                        counts[tag]++;
                    } else {
                        counts[tag] = 1;
                    }
                })
            })
            Object.values(this.props.outfits).forEach(outfit => {
                outfit.tags.forEach(tag => {
                    if (Object.keys(counts).includes(tag)) {
                        counts[tag]++;
                    } else {
                        counts[tag] = 1;
                    }
                })
            })
            let mostUsed = [];
            let mostUsedCount = -1;
            Object.keys(counts).forEach(tag => {
                if (counts[tag] > mostUsedCount) {
                    mostUsed = [tag];
                    mostUsedCount = counts[tag];
                } else if (counts[tag] == mostUsedCount) {
                    mostUsed.push(tag)
                }
            })

            return mostUsed.join(", ")
        }
        return "";
    }

    render() {
        const colors = ["#A83C28","#FF8670","#F66B54","#18A86B","#53F5B0"];
        let thisColor = colors[parseInt(this.props.currentUser.id) % colors.length]
        let defaultPicStyle = {
            backgroundColor: thisColor
        }

        let numClothing = "";
        let numOutfits = "";
        if (this.props.clothing) {
            numClothing = Object.values(this.props.clothing).length
        }
        if (this.props.outfits) {
            numOutfits = Object.values(this.props.outfits).length
        }


        return (
            <div className="overview-wrapper">
                <div className="top-div">
                    <div className="img-container" style={defaultPicStyle}>
                        <img src={defaultProfPic} alt=""/>
                    </div>
                    <h1>Overview</h1>
                </div>
                <div className="account-details">
                    <div className="left-div">
                        <h2 className="important">USERNAME</h2>
                        <h2 className="important">EMAIL</h2>
                        <div className="divider"></div>
                        <h2>MOST USED AESTHETIC</h2>
                        <h2># OF CLOTHES</h2>
                        <h2># OF OUTFITS</h2>
                    </div>
                    <div className="right-div">
                        <h2 className="important">{this.props.currentUser.username}</h2>
                        <h2 className="important">{this.props.currentUser.email}</h2>
                        <div className="divider"></div>
                        <h2>{this.caclulateStats()}</h2>
                        <h2>{numClothing}</h2>
                        <h2>{numOutfits}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
