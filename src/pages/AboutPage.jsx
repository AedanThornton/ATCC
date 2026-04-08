import { Link } from "react-router-dom";
import "../styles/aboutpage.css"

function AboutPage() {
  return (
    <div className='about-page'>
      <h2>About This Project</h2>
      <p>This is a fan-made card library (and more coming soon!) made with React. It is open source and can be found on my GitHub.</p>
      <p>The idea is to have an all-inclusive place to reference cards for the Aeon Trespass games for recreational purposes.</p>
      <p>This site is owned and managed by Artifus (Aedan Thornton). I and this site are unaffiliated with Into the Unknown Studios.</p>
      <p>I claim none of the game info contained on this site. Image assets are recreations by me of the originals, using Inkscape. Originals are owned by Into the Unknown Studios.</p>
      <p>You can help <Link to="https://ko-fi.com/artifus" target="_blank" rel="noopener noreferrer">
        support this project <img src="https://storage.ko-fi.com/cdn/logomarkLogo.png" alt=' on Ko-fi' width="25" height="20" />
      </Link> on my Ko-fi</p>
    </div>
  );
}

export default AboutPage;