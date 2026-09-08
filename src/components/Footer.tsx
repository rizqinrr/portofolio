import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-w3ls text-center py-5">
      <div className="container pt-4">
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
          <Link to="/" className="footer-logo">
            <img src="/portofolio/assets/jpg/nr.png" alt="logo NR" />
          </Link>
          <p className="mt-4 text-white">
            Portofolio web personal yang menampilkan proyek-proyek rekayasa perangkat lunak, eksplorasi teknologi, dan studi kasus pengembangan web.
          </p>
          <div className="social-icons-main mt-4 pb-3">
            <ul className="social-icons3">
              <li>
                <a
                  href="https://github.com/rizqinrr"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a
                  href="mailto:studyrizqi@gmail.com"
                  title="Email"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <p className="copy-right-w3 text-white mt-5 pt-4">
          © {new Date().getFullYear()} rizqinrr. All rights reserved
        </p>
      </div>

      {/* Move top button */}
      <button onClick={scrollToTop} id="movetop" title="Go to top">
        <span className="fas fa-level-up-alt" aria-hidden="true"></span>
      </button>
    </footer>
  );
}
