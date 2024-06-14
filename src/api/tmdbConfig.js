// src/api/tmdbConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '58425c188f560fa82fbb522a0780ed0d',
  },
});

export default instance;
