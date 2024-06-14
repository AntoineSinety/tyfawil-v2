// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import WatchList from './components/WatchList';
import CategoryMovies from './components/CategoryMovies';
import CategoryList from './components/CategoryList';
import Header from './components/Header';
import { WatchListProvider } from './context/WatchListContext';
import './assets/style/main.scss'; // Importer le fichier SCSS principal
import './index.css';


const App = () => {
  return (
    <WatchListProvider>
      <Router>
        <Header />
        <div style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/category/:categoryId" element={<CategoryMovies />} />
            <Route path="/categories" element={<CategoryList />} /> {/* Nouvelle route */}
          </Routes>
        </div>
      </Router>
    </WatchListProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
