import { useState } from 'react';
import { Link } from 'react-router-dom';
import GalleryModal from '../components/GalleryModal';
import { certificates } from '../data/certificates';
import { projects } from '../data/projects';

export default function Services() {
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    subtitle?: string;
    image: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'certificates' | 'projects'>('all');

  return (
    <>
      {/* Breadcrumb */}
      <section className="w3l-breadcrumb py-lg-5">
        <div className="container pt-4 pb-sm-4">
          <h4 className="inner-text-title font-weight-bold pt-5">Services & Portfolio</h4>
          <ul className="breadcrumbs-custom-path">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">
              <i className="fas fa-angle-right mx-2"></i>Services
            </li>
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section className="w3l-bottom-grids-6 py-5" id="features">
        <div className="container py-md-5 py-4">
          <div className="title-heading-w3 text-center mb-sm-5 mb-4">
            <h5 className="title-small mb-1">What I Offer</h5>
            <h3 className="title-style">My Services</h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 grids-feature mb-4">
              <div className="area-box active">
                <div className="icon-style">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h4>
                  <span className="title-head">Web Development</span>
                </h4>
                <p>
                  Membangun aplikasi web interaktif, responsif, dan dinamis menggunakan stack modern (React, PHP/Laravel, JavaScript).
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 grids-feature mb-4">
              <div className="area-box">
                <div className="icon-style">
                  <i className="fas fa-database"></i>
                </div>
                <h4>
                  <span className="title-head">Database & Backend</span>
                </h4>
                <p>
                  Perancangan skema basis data relational (MySQL), integrasi REST API, autentikasi pengguna, dan administrasi data.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 grids-feature mb-4">
              <div className="area-box">
                <div className="icon-style">
                  <i className="fas fa-network-wired"></i>
                </div>
                <h4>
                  <span className="title-head">Networking & System</span>
                </h4>
                <p>
                  Konfigurasi routing jaringan, pemantauan perangkat IP, integrasi sistem CCTV/NVR, dan automasi sistem lokal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Certificates & Projects */}
      <section className="w3l-servicesblock1 py-5" id="gallery">
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
            {/* Certificates */}
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

            {/* Projects */}
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
