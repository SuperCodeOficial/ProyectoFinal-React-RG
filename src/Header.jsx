import React, { useState, useEffect, useRef } from 'react';
import { Home, Star, Menu, X } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const HeaderSite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const menuRef = useRef(null); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); 
  };

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b bg-white p-4">
      <nav className="container d-flex justify-content-between align-items-center position-relative">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <img
            src="/img/codigo.png" 
            alt="Descripción de la imagen"
            className="w-8 h-8 inline-block mr-2"
          />
          <span className="px-2 fs-5 fst-italic">SuperMax</span>
        </div>
        <button
          className="d-md-none btn btn-outline-secondary"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="position-absolute bg-white shadow-lg p-3 d-md-none" 
            style={{
              top: '100%',
              left: '25%', 
              width: '50vw',
              zIndex: 1000,
              borderRadius: '8px',
            }}
          >
            <button
              className="btn btn-sm btn-light position-absolute"
              style={{ top: '10px', right: '10px' }}
              onClick={closeMenu}
            >
              <X size={20} />
            </button>

            <ul className="list-unstyled m-0">
              {/* Home */}
              <li className="my-2">
                <Link
                  className="text-decoration-none text-dark hover:text-blue-500 d-flex align-items-center"
                  to="/"
                  onClick={closeMenu}
                >
                  <Home size={24} />
                  <span className="px-2">Home</span>
                </Link>
              </li>
              <li className="my-2">
                <Link
                  className="text-decoration-none text-dark hover:text-blue-500 d-flex align-items-center"
                  to="/favoritos"
                  onClick={closeMenu}
                >
                  <Star size={24} />
                  <span className="px-2">Favoritos</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
        <ul
          className="list-unstyled d-none d-md-flex align-items-center m-0"
          style={{ gap: '1rem' }} 
        >
          <li>
            <Link
              className="text-decoration-none text-dark hover:text-blue-500 d-flex align-items-center"
              to="/"
            >
              <Home size={24} />
              <span className="px-2">Home</span>
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none text-dark hover:text-blue-500 d-flex align-items-center"
              to="/favoritos"
            >
              <Star size={24} />
              <span className="px-2">Favoritos</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderSite;
