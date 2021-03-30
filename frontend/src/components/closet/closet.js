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
            selectedSidebar: "overview"
        }

        this.updateSelected = this.updateSelected.bind(this);
    }

    componentDidMount() {
        this.props.currentUser().then(result => {
            let thisUser = result.data;
            this.setState({
                currentUser: thisUser
            })
            this.props.getUserClothing(thisUser.id)
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
    
    render() {
        // console.log(this.state.currentUser)
        // console.log(this.props.clothes)

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
            currentContent = <Clothing currentUser={this.state.currentUser} clothing={this.props.clothing}/>;
            addButton = (
                <div className="upload-clothes-wrapper">
                    <Link to="/clothing/new"><img src={uploadClothesIcon} alt=""/></Link>
                    <span>Add Clothing</span>
                    <div className="hider"></div>
                </div>
            )
        } else if (this.state.selectedSidebar === "outfits") {
            outfitsClass = "selected";
            currentContent = <Outfits />;
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
                <div className="sidebar">
                    <div className="sidebar-content">
                        <h2>{this.state.currentUser.username}'s Closet</h2>
                        <div className="divider"></div>
                        <h3 className={overviewClass} onClick={this.updateSelected("overview")}>Overview</h3>
                        <div className="divider"></div>
                        <h3 className={clothingClass} onClick={this.updateSelected("clothing")}>Clothing</h3>
                        <h3 className={outfitsClass} onClick={this.updateSelected("outfits")}>Outfits</h3>
                    </div>
                </div>
                <div className="content">
                    {addButton}
                    {currentContent}
                </div>
            </div>
        )
    }
}
