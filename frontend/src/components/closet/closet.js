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
        this.updateProps = this.updateProps.bind(this)
        this.newClothing = this.newClothing.bind(this)
        this.newOutfit = this.newOutfit.bind(this)
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

    updateProps() {
        this.props.currentUser().then(result => {
            let thisUser = result.data;
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

    newClothing(e) {
        e.preventDefault();
        this.props.history.push("/clothing/new")
    }

    newOutfit(e) {
        e.preventDefault();
        this.props.history.push("/outfit/new")
    }
    
    render() {

        let overviewClass = "";
        let clothingClass = "";
        let outfitsClass = "";
        let currentContent = "";
        let addButton = ""

        if (this.state.selectedSidebar === "overview") {
            overviewClass = "selected";
            currentContent = <Overview outfits={this.props.outfits} clothing={this.props.clothing} currentUser={this.state.currentUser}/>;
        } else if (this.state.selectedSidebar === "clothing") {
            clothingClass = "selected";
            currentContent = <Clothing updateProps={this.updateProps} getUserClothing={this.props.getUserClothing} deleteClothing={this.props.deleteClothing} currentUser={this.state.currentUser} clothing={this.props.clothing}/>;
            addButton = (
                <div className="upload-clothes-wrapper">
                    <Link to="/clothing/new"><img src={uploadClothesIcon} alt=""/></Link>
                    <span onClick={this.newClothing}>Add Clothing</span>
                    <div className="hider"></div>
                </div>
            )
        } else if (this.state.selectedSidebar === "outfits") {
            outfitsClass = "selected";
            currentContent = <Outfits updateProps={this.updateProps} getUserOutfits={this.props.getUserOutfits} deleteOutfit={this.props.deleteOutfit} currentUser={this.state.currentUser} outfits={this.props.outfits}/>;
            addButton = (
                <div className="upload-clothes-wrapper">
                    <Link to="/outfit/new"><img src={uploadOutfitsIcon} alt=""/></Link>
                    <span onClick={this.newOutfit}>Add Outfit</span>
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
