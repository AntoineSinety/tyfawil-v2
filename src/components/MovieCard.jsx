// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, genres }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
          alt={movie.title} 
          className="movie-poster"
        />
      </Link>
      <div className="movie-info">
        <h2 className="movie-title">
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h2>
        <p className="movie-date">Date de sortie: {formatDate(movie.release_date)}</p>
        <p className="movie-genres">
          Genres: {movie.genre_ids.map(id => genres[id]).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
