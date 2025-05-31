import './Navbar.css'
import { useState, useEffect } from 'react';
import SocialMedia from './SocialMedia'

function Navbar() {
    return (
        <nav>
            <img src={`${process.env.PUBLIC_URL}/portfolio-logo-blue.png`} alt="Portfolio Logo" className="logo" />
            {/* <ul>
                <li><a href="#/">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul> */}
            <SocialMedia />
        </nav>
    )
}

export default Navbar