import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import uploadClothesIcon from '../../assets/icons/uploadClothes.png'
import uploadOutfitsIcon from '../../assets/icons/uploadOutfits.png'

import '../../styles/closet/closet.css'
import Clothing from './clothing'
import Outfits from './outfits'
import Overview from './overview'

export default class Closet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: {id:"", username: "", email: ""},
            selectedSidebar: "overview",
            sidebarClass: "sidebar",
            contentClass: "content"
        }

        this.updateSelected = this.updateSelected.bind(this);
        this.clickKnob = this.clickKnob.bind(this)
    }

    componentDidMount() {
        this.props.currentUser().then(result => {
            let thisUser = result.data;
            this.setState({
                currentUser: thisUser
            })
            this.props.getUserClothing(thisUser.id)
            this.props.getUserOutfits(thisUser.id)
        })
        
    }

    updateSelected(field) {
        return (e) => {
            e.preventDefault();
            this.setState({
                selectedSidebar: field
            })
        }
    }

    clickKnob(e) {
        e.preventDefault();
        let currentSidebar = this.state.sidebarClass
        let currentContent = this.state.contentClass
        this.setState({
            sidebarClass: currentSidebar === "sidebar" ? "sidebar hide-sidebar" : "sidebar",
            contentClass: currentContent === "content" ? "content hide-sidebar" : "content",
        })
    }
    
    render() {

        let overviewClass = "";
        let clothingClass = "";
        let outfitsClass = "";
        let currentContent = "";
        let addButton = ""

        if (this.state.selectedSidebar === "overview") {
            overviewClass = "selected";
            currentContent = <Overview currentUser={this.state.currentUser}/>;
        } else if (this.state.selectedSidebar === "clothing") {
            clothingClass = "selected";
            currentContent = <Clothing deleteClothing={this.props.deleteClothing} currentUser={this.state.currentUser} clothing={this.props.clothing}/>;
            addButton = (
                <div className="upload-clothes-wrapper">
                    <Link to="/clothing/new"><img src={uploadClothesIcon} alt=""/></Link>
                    <span>Add Clothing</span>
                    <div className="hider"></div>
                </div>
            )
        } else if (this.state.selectedSidebar === "outfits") {
            outfitsClass = "selected";
            currentContent = <Outfits deleteOutfit={this.props.deleteOutfit} currentUser={this.state.currentUser} outfits={this.props.outfits}/>;
            addButton = (
                <div className="upload-clothes-wrapper">
                    <Link to="/outfit/new"><img src={uploadOutfitsIcon} alt=""/></Link>
                    <span>Add Outfit</span>
                    <div className="hider"></div>
                </div>
            )
        }

        return (
            <div className="closet-wrapper">
                <div className={this.state.sidebarClass}>
                    <div className="top-square"></div>
                    <div className="bottom-square"></div>
                    <div className="knob" onClick={this.clickKnob}></div>
                    <div className="sidebar-content">
                        <h2>{this.state.currentUser.username}'s Closet</h2>
                        <div className="divider"></div>
                        <h3 className={overviewClass} onClick={this.updateSelected("overview")}>Overview</h3>
                        <div className="divider"></div>
                        <h3 className={clothingClass} onClick={this.updateSelected("clothing")}>Clothing</h3>
                        <h3 className={outfitsClass} onClick={this.updateSelected("outfits")}>Outfits</h3>
                    </div>
                </div>
                <div className={this.state.contentClass}>
                    {addButton}
                    {currentContent}
                </div>
            </div>
        )
    }
}
