// src/components/MovieList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/tmdbConfig';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/genre/movie/list', {
          params: { language: 'fr-FR' },
        });
        const genreMap = {};
        response.data.genres.forEach(genre => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get('/movie/now_playing', {
          params: { language: 'fr-FR' },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };

    fetchGenres();
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Films Actuellement au Cinéma</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
