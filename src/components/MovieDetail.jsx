// src/components/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/tmdbConfig';
import { useParams, Link } from 'react-router-dom';
import { useWatchList } from '../context/WatchListContext';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const { watchList, addToWatchList, removeFromWatchList } = useWatchList();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`/movie/${id}`, {
          params: { language: 'fr-FR' },
        });
        setMovie(movieResponse.data);

        const videosResponse = await axios.get(`/movie/${id}/videos`, {
          params: { language: 'fr-FR' },
        });
        const trailer = videosResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Chargement...</div>;

  const isInWatchList = watchList.some((item) => item.id === movie.id);

  const handleWatchListClick = () => {
    if (isInWatchList) {
      removeFromWatchList(movie.id);
    } else {
      addToWatchList({
        ...movie,
        genres: movie.genres.map(genre => ({ id: genre.id, name: genre.name }))
      });
    }
  };

  return (
    <div className="movie-detail">
      <div className="navigation-buttons">
        <Link to="/">Revenir à la page d'accueil</Link>
        <Link to="/watchlist">Voir ma liste de films à voir</Link>
        <button onClick={handleWatchListClick}>
          {isInWatchList ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
        </button>
      </div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      {trailerKey && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      <div className="movie-info">
        <p><strong>Date de sortie :</strong> {new Intl.DateTimeFormat('fr-FR').format(new Date(movie.release_date))}</p>
        <p><strong>Genres :</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Durée :</strong> {movie.runtime} minutes</p>
        <p><strong>Note moyenne :</strong> {movie.vote_average}</p>
        <p><strong>Nombre de votes :</strong> {movie.vote_count}</p>
        <p><strong>Langue originale :</strong> {movie.original_language}</p>
        <p><strong>Budget :</strong> ${movie.budget.toLocaleString()}</p>
        <p><strong>Recettes :</strong> ${movie.revenue.toLocaleString()}</p>
        <p><strong>Compagnies de production :</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
        <p><strong>Pays de production :</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
