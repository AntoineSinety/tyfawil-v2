// src/components/WatchList.jsx
import React from 'react';
import { useWatchList } from '../context/WatchListContext';
import { Link } from 'react-router-dom';

const WatchList = () => {
  const { watchList, removeFromWatchList } = useWatchList();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
  };

  return (
    <div>
      <h1>Liste des Films à Voir</h1>
      <Link to="/">Revenir à la page d'accueil</Link>
      <ul>
        {watchList.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title} 
              />
            </Link>
            <div className="movie-info">
              <h2>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              </h2>
              <p>Date de sortie: {movie.release_date ? formatDate(movie.release_date) : 'Date inconnue'}</p>
              <p>
                Genres: {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'Genres inconnus'}
              </p>
              <button onClick={() => removeFromWatchList(movie.id)}>Retirer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
