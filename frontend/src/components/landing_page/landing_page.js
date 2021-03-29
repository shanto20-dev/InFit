import React from 'react'
import Carousel from './carousel'

import '../../styles/landing_page/landing_page.css'

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <Carousel />
            </div>
        )
    }
}
