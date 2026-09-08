import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="w3l-breadcrumb py-lg-5">
        <div className="container pt-4 pb-sm-4">
          <h4 className="inner-text-title font-weight-bold pt-5">About Me</h4>
          <ul className="breadcrumbs-custom-path">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">
              <i className="fas fa-angle-right mx-2"></i>My Intro
            </li>
          </ul>
        </div>
      </section>

      {/* About detail block */}
      <section className="w3l-aboutblock1 py-5" id="about">
        <div className="container py-md-5 py-4">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="position-relative">
                <img
                  src="/portofolio/assets/jpg/foto1.jpeg"
                  alt="Muhammad Rizqi Nurrahman"
                  className="radius-image img-fluid shadow"
                />
              </div>
            </div>
            <div className="col-lg-8 ps-lg-5 mt-lg-0 mt-5">
              <h5 className="title-small mb-1">My Intro</h5>
              <h3 className="title-style">About Me</h3>
              <p className="mt-3">
                Hello! I'm Muhammad Rizqi Nurrahman, a web development enthusiast with a deep curiosity for both frontend experiences and backend architectures. I continuously hone my skills by working on real-world projects and learning modern frameworks.
              </p>
              <div className="my-info mt-md-5 mt-4">
                <ul className="single-info">
                  <li className="name-style">Full Name</li>
                  <li>:</li>
                  <li>
                    <p>Muhammad Rizqi Nurrahman</p>
                  </li>
                </ul>
                <ul className="single-info">
                  <li className="name-style">Status</li>
                  <li>:</li>
                  <li>
                    <p>Student / Software Developer</p>
                  </li>
                </ul>
                <ul className="single-info">
                  <li className="name-style">Email</li>
                  <li>:</li>
                  <li>
                    <p>
                      <a href="mailto:studyrizqi@gmail.com">studyrizqi@gmail.com</a>
                    </p>
                  </li>
                </ul>
                <ul className="single-info">
                  <li className="name-style">GitHub</li>
                  <li>:</li>
                  <li>
                    <p>
                      <a
                        href="https://github.com/rizqinrr"
                        target="_blank"
                        rel="noreferrer"
                      >
                        github.com/rizqinrr
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center mt-5">
                <Link to="/contact" className="btn btn-style me-3">
                  Hire Me
                </Link>
                <Link to="/services" className="btn btn-style btn-style-border">
                  My Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Timeline */}
      <section className="w3l-timeline-1 py-5">
        <div className="container py-lg-5 py-4">
          <div className="title-heading-w3 text-center mb-sm-5 mb-4">
            <h5 className="title-small mb-1">Experience</h5>
            <h3 className="title-style">Education & Experience</h3>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h5 className="sub-title-timeline">
                <i className="fas fa-graduation-cap"></i> Education
              </h5>
              <div className="timeline">
                <div className="column">
                  <div className="title">
                    <h2>Informatics Engineering / Computer Science</h2>
                  </div>
                  <div className="description">
                    <p>Focused on web technologies, algorithm design, software architecture, and system integration.</p>
                    <h4>
                      <i className="fas fa-calendar-alt"></i> Present
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-lg-0 mt-5">
              <h5 className="sub-title-timeline">
                <i className="fas fa-briefcase"></i> Experience & Activities
              </h5>
              <div className="timeline">
                <div className="column">
                  <div className="title">
                    <h2>Web Development & Open Source</h2>
                  </div>
                  <div className="description">
                    <p>Developing various web apps including course management systems, student administration portals, and custom routing solutions.</p>
                    <h4>
                      <i className="fas fa-calendar-alt"></i> Continuous
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills progress section */}
      <section className="w3l-progress py-5" id="progress">
        <div className="container py-md-5 py-4">
          <div className="title-heading-w3 text-center mb-sm-5 mb-4">
            <h5 className="title-small mb-1">My Skills</h5>
            <h3 className="title-style">My Expertise Area</h3>
          </div>
          <div className="row py-lg-4">
            <div className="col-lg-6 pe-lg-5">
              <div className="progress-info info1">
                <h6 className="progress-tittle">
                  HTML5 & CSS3 / Modern Styling <span>90%</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: '90%' }}
                    aria-valuenow={90}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
              <div className="progress-info info2">
                <h6 className="progress-tittle">
                  JavaScript & React.js <span>85%</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: '85%' }}
                    aria-valuenow={85}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5 mt-lg-0 mt-5">
              <div className="progress-info info3">
                <h6 className="progress-tittle">
                  PHP & Laravel / Backend <span>80%</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: '80%' }}
                    aria-valuenow={80}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
              <div className="progress-info info4">
                <h6 className="progress-tittle">
                  Database & Networking <span>75%</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: '75%' }}
                    aria-valuenow={75}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
