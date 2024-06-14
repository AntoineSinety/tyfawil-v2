// src/context/WatchListContext.jsx
import React, { createContext, useState, useContext } from 'react';

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (movie) => {
    setWatchList((prevList) => [...prevList, movie]);
  };

  const removeFromWatchList = (id) => {
    setWatchList((prevList) => prevList.filter((movie) => movie.id !== id));
  };

  return (
    <WatchListContext.Provider value={{ watchList, addToWatchList, removeFromWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};
