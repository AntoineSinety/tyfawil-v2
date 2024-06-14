// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/watchlist">Films à Voir</Link>
          </li>
          <li>
            <Link to="/categories">Catégories</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
