import React, { Component } from 'react'
import '../../styles/landing_page/carousel.css'

import outfit1 from '../../assets/carousel_images/outfit1.jpg'
import outfit2 from '../../assets/carousel_images/outfit2.jpg'
import outfit3 from '../../assets/carousel_images/outfit3.jpg'
import outfit4 from '../../assets/carousel_images/outfit4.jpg'
import outfit5 from '../../assets/carousel_images/outfit5.jpg'

const imgArr = [outfit1, outfit2, outfit3, outfit4, outfit5]



export default class Carousel extends Component {

    constructor (props) {
        super(props);
    
        this.state = {
            currentImageIndex: 0
        };

        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }

    previousSlide () {

        const index = (this.state.currentImageIndex + imgArr.length - 1) % imgArr.length;

        document.getElementById("image-slides").classList.add("move-left")
    
        setTimeout( () => {
            this.setState({
                currentImageIndex: index
            });
            document.getElementById("image-slides").classList.remove("move-left")
        }, 900);
    }
    
    nextSlide () {

        const index = (this.state.currentImageIndex + 1) % imgArr.length

        document.getElementById("image-slides").classList.add("move-right")
    
        setTimeout( () => {
            this.setState({
                currentImageIndex: index
            });
            document.getElementById("image-slides").classList.remove("move-right")
        }, 900);
    }

    render() {
        console.log(imgArr[this.state.currentImageIndex])

        let leftIdx = (this.state.currentImageIndex + imgArr.length - 1) % imgArr.length;
        let farLeftIdx = (this.state.currentImageIndex + imgArr.length - 2) % imgArr.length;
        let rightIdx = (this.state.currentImageIndex + 1) % imgArr.length;
        let farRightIdx = (this.state.currentImageIndex + 2) % imgArr.length;

        return (
            <div className="carousel">
                <Arrow
                    direction="left"
                    clickFunction={ this.previousSlide }
                    arrow="&#9664;" />
                <ImageSlides img1={ imgArr[farLeftIdx] } img2={ imgArr[leftIdx] } img3={ imgArr[this.state.currentImageIndex] } img4={ imgArr[rightIdx] } img5={ imgArr[farRightIdx] } />
                <Arrow
                    direction="right"
                    clickFunction={ this.nextSlide }
                    arrow="&#9654;" />
            </div>
        )
    }
}

const ImageSlides = ({ img1, img2, img3, img4, img5 }) => {

    const style1 = {
        backgroundImage: `url(${img1})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        left: '360px',
        transform: 'scale(0.6,0.6)',
        backgroundColor: 'lightgrey',
        width: 'Calc(100%/5)',
        height: '100%',
    };

    const style2 = {
        backgroundImage: `url(${img2})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        left: 'Calc(100%/5 + 180px)',
        transform: 'scale(0.6,0.6)',
        backgroundColor: 'lightgrey'
    };

    const style3 = {
        backgroundImage: `url(${img3})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        left: 'Calc(200%/5)',
        width: 'Calc(100%/5)',
        height: '100%',
        backgroundColor: 'lightgrey'
    };

    const style4 = {
        backgroundImage: `url(${img4})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        left: 'Calc(300%/5 - 180px)',
        width: 'Calc(100%/5)',
        height: '100%',
        transform: 'scale(0.6,0.6)',
        backgroundColor: 'lightgrey'
    };

    const style5 = {
        backgroundImage: `url(${img5})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        right: '360px',
        transform: 'scale(0.6,0.6)',
        backgroundColor: 'lightgrey',
        width: 'Calc(100%/5)',
        height: '100%',
    };

    
  
    return (
        <div id="image-slides" className="image-slides">
            <div className="image-slide1" style={style1}></div>
            <div className="image-slide2" style={style2}></div>
            <div className="image-slide3" style={style3}></div>
            <div className="image-slide4" style={style4}></div>
            <div className="image-slide5" style={style5}></div>
        </div>
    );
}

const Arrow = ({ direction, clickFunction, arrow }) => (
    <div
        className={ `slide-arrow ${direction}` }
        onClick={ clickFunction }>
        { arrow }
    </div>
);