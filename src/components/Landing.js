import './Landing.css'

function Landing() {
    return (
        <div className="landing">
            <span className="title">DevOps Engineer</span>
            <h1>Hello, I’m <br></br><span>Lucas</span></h1>
            <p>
                I’m building scalable, secure, and automated cloud-native infrastructures, leveraging containerization and cutting-edge CI/CD pipelines to deliver robust, efficient, and resilient workflows.
            </p>
            <a href="cv-lucasferraz.pdf" download="cv-lucasferraz.pdf" className="btn">Download CV</a>
        </div>

    )
}

export default Landing;