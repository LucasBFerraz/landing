import './SocialMedia.css'

function SocialMedia() {
    return (
        <div className="socials">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
            <footer>
                <div className="rounded-social-buttons">
                    <a className="social-button linkedin" href="https://www.linkedin.com/in/lucas-ferraz-b3aa03217/" target="_blank"><i className="fab fa-linkedin"></i></a>
                    <a className="social-button github" href="https://github.com/LucasBFerraz/" target="_blank"><i className="fab fa-github"></i></a>
                </div>
            </footer>
        </div>
    )
}

export default SocialMedia;