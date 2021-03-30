import React, { Component } from 'react'

import defaultProfPic from '../../assets/icons/whiteInfitImpala.png'
import '../../styles/closet/overview.css'

export default class Overview extends Component {
    render() {
        const colors = ["#A83C28","#FF8670","#F66B54","#18A86B","#53F5B0"];
        let thisColor = colors[parseInt(this.props.currentUser.id) % colors.length]
        let defaultPicStyle = {
            backgroundColor: thisColor
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
                        <h2>TODO</h2>
                        <h2>TODO</h2>
                        <h2>TODO</h2>
                    </div>
                </div>
            </div>
        )
    }
}
