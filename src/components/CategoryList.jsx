// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/tmdbConfig';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTheaterMasks, faDragon, faUserSecret, faRobot, faHeartbeat, faBolt, faGhost, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const CategoryList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/genre/movie/list', {
          params: { language: 'fr-FR' },
        });
        const sortedGenres = response.data.genres.sort((a, b) => a.name.localeCompare(b.name));
        setGenres(sortedGenres);
      } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const getIconForGenre = (genreName) => {
    switch (genreName.toLowerCase()) {
      case 'action':
        return faBolt;
      case 'aventure':
        return faDragon;
      case 'animation':
        return faRobot;
      case 'comédie':
        return faTheaterMasks;
      case 'crime':
        return faUserSecret;
      case 'documentaire':
        return faFilm;
      case 'drame':
        return faHeartbeat;
      case 'famille':
        return faUserFriends;
      case 'fantastique':
        return faGhost;
      default:
        return faFilm; // Icône par défaut
    }
  };

  return (
    <div>
      <h1>Catégories</h1>
      <div className="category-list">
        {genres.map((genre) => (
          <Link to={`/category/${genre.id}`} key={genre.id} className="category-card">
            <div className="icon">
              <FontAwesomeIcon icon={getIconForGenre(genre.name)} size="3x" />
            </div>
            <div className="name">{genre.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
