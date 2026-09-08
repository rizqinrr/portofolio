import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter basename="/portofolio">
      <div className="portfolio-app">
        <Navbar />
        <main style={{ minHeight: '80vh', paddingTop: '100px' }}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="container py-5 text-center">
                  <h2>Home Page Placeholder</h2>
                  <p className="lead">Siap untuk migrasi konten Fase 3</p>
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="container py-5 text-center">
                  <h2>About Page Placeholder</h2>
                </div>
              }
            />
            <Route
              path="/services"
              element={
                <div className="container py-5 text-center">
                  <h2>Services Page Placeholder</h2>
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="container py-5 text-center">
                  <h2>Contact Page Placeholder</h2>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
