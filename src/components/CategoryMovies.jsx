// src/components/CategoryMovies.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/tmdbConfig';
import { useParams, Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const CategoryMovies = () => {
  const { categoryId } = useParams();
  const [movies, setMovies] = useState([]);
  const [categoryName, setCategoryName] = useState('');
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

    const fetchCategoryMovies = async () => {
      try {
        const response = await axios.get('/discover/movie', {
          params: {
            with_genres: categoryId,
            sort_by: 'popularity.desc',
            language: 'fr-FR',
          },
        });
        setMovies(response.data.results);

        const genreResponse = await axios.get('/genre/movie/list', {
          params: { language: 'fr-FR' },
        });
        const genre = genreResponse.data.genres.find((genre) => genre.id === parseInt(categoryId));
        setCategoryName(genre ? genre.name : 'Genre Inconnu');
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };

    fetchGenres();
    fetchCategoryMovies();
  }, [categoryId]);

  return (
    <div>
      <h1>Meilleurs Films - {categoryName}</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
    </div>
  );
};

export default CategoryMovies;
