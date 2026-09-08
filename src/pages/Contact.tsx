import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="w3l-breadcrumb py-lg-5">
        <div className="container pt-4 pb-sm-4">
          <h4 className="inner-text-title font-weight-bold pt-5">Contact Me</h4>
          <ul className="breadcrumbs-custom-path">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">
              <i className="fas fa-angle-right mx-2"></i>Contact
            </li>
          </ul>
        </div>
      </section>

      {/* Contact block */}
      <section className="w3l-contact py-5" id="contact">
        <div className="container py-md-5 py-4">
          <div className="title-heading-w3 text-center mb-sm-5 mb-4">
            <h5 className="title-small mb-1">Get In Touch</h5>
            <h3 className="title-style">Contact Me</h3>
          </div>
          <div className="row contact-block">
            <div className="col-md-5 contact-left pe-lg-5">
              <h3 className="mb-4">Let's talk about projects</h3>
              <p className="cont-para mb-sm-5 mb-4">
                I am happy to discuss new projects, creative ideas, or opportunities to collaborate. Feel free to connect via email or GitHub.
              </p>
              <div className="cont-details">
                <div className="d-flex contact-grid">
                  <div className="cont-left text-center me-3">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="cont-right">
                    <h6>Location</h6>
                    <p>Indonesia</p>
                  </div>
                </div>
                <div className="d-flex contact-grid mt-4">
                  <div className="cont-left text-center me-3">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="cont-right">
                    <h6>Email</h6>
                    <p>
                      <a href="mailto:studyrizqi@gmail.com" className="mail">
                        studyrizqi@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="d-flex contact-grid mt-4">
                  <div className="cont-left text-center me-3">
                    <i className="fab fa-github"></i>
                  </div>
                  <div className="cont-right">
                    <h6>GitHub</h6>
                    <p>
                      <a
                        href="https://github.com/rizqinrr"
                        target="_blank"
                        rel="noreferrer"
                        className="mail"
                      >
                        github.com/rizqinrr
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7 contact-right mt-md-0 mt-5 ps-lg-0">
              {submitted && (
                <div className="alert alert-success mb-4" role="alert">
                  Terima kasih! Pesan kamu telah dicatat. Kamu juga bisa langsung mengirimkan email ke <strong>studyrizqi@gmail.com</strong>.
                </div>
              )}
              <form onSubmit={handleSubmit} className="signin-form">
                <div className="input-grids">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    className="contact-input"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email*"
                    className="contact-input"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject*"
                    className="contact-input"
                    required
                  />
                </div>
                <div className="form-input">
                  <textarea
                    name="message"
                    placeholder="Type your message here*"
                    required
                  ></textarea>
                </div>
                <div className="text-end">
                  <button className="btn btn-style btn-style-border" type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
