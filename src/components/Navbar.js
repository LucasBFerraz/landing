import './Navbar.css'

function Navbar() {
    return (
        <nav>
            <img src={`${process.env.PUBLIC_URL}/portfolio-logo-red.png`} alt="Portfolio Logo" className="logo" />
            <ul>
                <li><a href="#/">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <a href="#" className="btn">Resume</a>
        </nav>
    )
}

export default Navbar