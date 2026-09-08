import { useState } from 'react';
import { Link } from 'react-router-dom';
import TypingText from '../components/TypingText';
import GalleryModal from '../components/GalleryModal';
import { certificates } from '../data/certificates';
import { projects } from '../data/projects';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    subtitle?: string;
    image: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'certificates' | 'projects'>('all');

  return (
    <>
      {/* Banner / Hero section */}
      <section className="w3l-banner py-5" id="home">
        <div className="container py-md-5 py-4">
          <div className="row align-items-center pt-4">
            <div className="col-md-6 banner-left pe-xl-5">
              <h4>Hi, I'm Muhammad Rizqi Nurrahman</h4>
              <h3 className="mb-3 mt-1">
                <TypingText texts={['Traveler', 'Developer', 'Student']} />
              </h3>
              <p className="banner-sub me-md-5">
                I love the world of web development and will always try my best to keep developing my skills.
              </p>
              <div className="d-flex align-items-center buttons-banner mt-sm-5 mt-4">
                <Link to="/about" className="btn btn-style me-2">
                  About Me
                </Link>
                <Link to="/contact" className="btn btn-style btn-style-border">
                  Hire Me
                </Link>
              </div>
            </div>
            <div className="col-md-6 text-center mt-md-0 mt-5">
              <div className="hero-image-wrapper position-relative d-inline-block">
                <img
                  src="/portofolio/assets/jpg/foto1.jpeg"
                  alt="Muhammad Rizqi Nurrahman"
                  className="radius-image img-fluid shadow"
                  style={{
                    maxHeight: '480px',
                    objectFit: 'cover',
                    border: '4px solid rgba(255, 255, 255, 0.15)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Partners / Logos */}
      <section className="w3l-clients pt-5 pb-4" id="clients">
        <div className="container">
          <div className="company-logos text-center">
            <div className="row mx-auto justify-content-center align-items-center">
              <div className="col-md-2 col-sm-4 col-4 py-2">
                <img src="/portofolio/assets/images/html.png" alt="HTML5" className="img-fluid" style={{ maxHeight: '55px' }} />
              </div>
              <div className="col-md-2 col-sm-4 col-4 py-2">
                <img src="/portofolio/assets/images/css2.png" alt="CSS3" className="img-fluid" style={{ maxHeight: '55px' }} />
              </div>
              <div className="col-md-2 col-sm-4 col-4 py-2">
                <img src="/portofolio/assets/images/js2.png" alt="JavaScript" className="img-fluid" style={{ maxHeight: '55px' }} />
              </div>
              <div className="col-md-2 col-sm-4 col-4 py-2">
                <img src="/portofolio/assets/images/php2.png" alt="PHP" className="img-fluid" style={{ maxHeight: '55px' }} />
              </div>
              <div className="col-md-2 col-sm-4 col-4 py-2">
                <img src="/portofolio/assets/images/python2.png" alt="Python" className="img-fluid" style={{ maxHeight: '55px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Services overview */}
      <section className="w3l-bottom-grids-6 pt-sm-5 pb-5" id="features">
        <div className="container pt-lg-4">
          <div className="grids-area-hny main-cont-wthree-fea row">
            <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 text-center">
              <div className="position-relative">
                <img src="/portofolio/assets/jpg/foto2.jpg" alt="Rizqi profile" className="radius-image img-fluid" />
              </div>
            </div>
            <div className="col-xl-8 col-md-9 col-sm-8 offset-xl-1 ps-xl-0 pe-xl-5 mt-sm-0 mt-4">
              <h3 className="title-style mb-sm-5 mb-4">I'm a web developer with a passion for modern web engineering</h3>
              <div className="row">
                <div className="col-lg-4 col-md-6 grids-feature">
                  <div className="area-box active">
                    <div className="icon-style">
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <h4><span className="title-head">Creative Design</span></h4>
                    <Link to="/services" className="btn more p-0">
                      Explore More <i className="fas fa-long-arrow-alt-right ms-1"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 grids-feature mt-md-0 mt-4">
                  <div className="area-box">
                    <div className="icon-style">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <h4><span className="title-head">Web Development</span></h4>
                    <Link to="/services" className="btn more p-0">
                      Explore More <i className="fas fa-long-arrow-alt-right ms-1"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 grids-feature mt-lg-0 mt-4">
                  <div className="area-box">
                    <div className="icon-style">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <h4><span className="title-head">System Architecture</span></h4>
                    <Link to="/services" className="btn more p-0">
                      Explore More <i className="fas fa-long-arrow-alt-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About snippet & Skills */}
      <section className="w3l-aboutblock1 pt-lg-5 pt-2 pb-5" id="about">
        <div className="container py-md-5 py-4">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="position-relative">
                <img src="/portofolio/assets/jpg/foto1.jpeg" alt="" className="radius-image img-fluid" />
              </div>
            </div>
            <div className="col-lg-8 ps-lg-5 mt-lg-0 mt-5">
              <h5 className="title-small mb-1">My Intro</h5>
              <h3 className="title-style">About Me</h3>
              <p className="mt-3">
                Hello! I'm Muhammad Rizqi Nurrahman, a passionate student and developer deeply fascinated by the ever-evolving world of web development. I love building responsive, performant, and user-centric web applications.
              </p>
              <div className="my-info mt-md-5 mt-4">
                <ul className="single-info">
                  <li className="name-style">Name</li>
                  <li>:</li>
                  <li>
                    <p>Muhammad Rizqi Nurrahman</p>
                  </li>
                </ul>
                <ul className="single-info">
                  <li className="name-style">Email</li>
                  <li>:</li>
                  <li>
                    <p><a href="mailto:studyrizqi@gmail.com">studyrizqi@gmail.com</a></p>
                  </li>
                </ul>
                <ul className="single-info">
                  <li className="name-style">GitHub</li>
                  <li>:</li>
                  <li>
                    <p><a href="https://github.com/rizqinrr" target="_blank" rel="noreferrer">github.com/rizqinrr</a></p>
                  </li>
                </ul>
              </div>
              <Link to="/about" className="btn btn-style mt-5">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio: Certificates & Projects section */}
      <section className="w3l-gallery pb-5 pt-3" id="gallery">
        <div className="container py-md-5 py-4">
          <div className="title-heading-w3 text-center mb-sm-5 mb-4">
            <h5 className="title-small mb-1">Portfolio</h5>
            <h3 className="title-style">Some of my certificates and recent projects</h3>
            <div className="mt-4">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'all' ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All ({certificates.length + projects.length})
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'projects' ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveTab('projects')}
                >
                  Projects ({projects.length})
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'certificates' ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveTab('certificates')}
                >
                  Certificates ({certificates.length})
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Render Certificates */}
            {(activeTab === 'all' || activeTab === 'certificates') &&
              certificates.map((cert) => (
                <div key={cert.id} className="col-lg-4 col-md-6 item mb-4">
                  <div
                    className="zoom d-block"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setSelectedItem({
                        title: cert.title,
                        subtitle: cert.subtitle,
                        image: cert.image,
                      })
                    }
                  >
                    <img
                      className="card-img-bottom d-block rounded"
                      src={cert.image}
                      alt={cert.title}
                      style={{ height: '240px', objectFit: 'cover' }}
                    />
                    <span className="overlay__hover"></span>
                    <span className="hover-content">
                      <span className="title">{cert.title}</span>
                      <span className="content">{cert.subtitle}</span>
                    </span>
                  </div>
                </div>
              ))}

            {/* Render Projects */}
            {(activeTab === 'all' || activeTab === 'projects') &&
              projects.map((proj) => (
                <div key={proj.id} className="col-lg-4 col-md-6 item mb-4">
                  <div
                    className="zoom d-block"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setSelectedItem({
                        title: proj.title,
                        subtitle: proj.description,
                        image: proj.image,
                      })
                    }
                  >
                    <img
                      className="card-img-bottom d-block rounded"
                      src={proj.image}
                      alt={proj.title}
                      style={{ height: '240px', objectFit: 'cover' }}
                    />
                    <span className="overlay__hover"></span>
                    <span className="hover-content">
                      <span className="title">{proj.title}</span>
                      <span className="content">{proj.description}</span>
                    </span>
                  </div>
                  {proj.githubUrl && (
                    <div className="mt-2 text-center">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="fab fa-github me-1"></i> View Repository
                      </a>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Modal Lightbox Popup */}
      <GalleryModal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || ''}
        subtitle={selectedItem?.subtitle}
        image={selectedItem?.image || ''}
      />
    </>
  );
}
