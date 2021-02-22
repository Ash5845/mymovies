import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import WatchlistMovie from "./components/Watchlist-movie";

const getLocalStorage = () => {
  let list = localStorage.getItem("watchList");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("watchList")));
  } else {
    return [];
  }
};

const url = "http://api.tvmaze.com/search/shows?q=";
const watchlistUrl = "http://api.tvmaze.com/shows/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState(getLocalStorage());
  const [watchListMovies, setWatchListMovies] = useState([]);

const fetchWatchlist = async () => {
  setLoading(true);
  try {
    const mappedList = watchList.map(async (list) => {
      const response = await fetch(`${watchlistUrl}${list}`);
      const responseJson = await response.json();
      const { id, name, genres, rating, image, summary } = responseJson;
      return { id, name, genres, rating, image, summary };
    });
    if(mappedList){
    Promise.all(mappedList).then((results) => {
      setWatchListMovies(results);
      setLoading(false);
    });
    }else{
      setWatchListMovies([]);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}

const removeItem = (id) => {
   setWatchList(watchList.filter((movie) => movie !== id));
};

const addToWatchList = (id) => {
  setWatchList([...watchList, id]);
  window.location = "/mymovies"
};

useEffect(() => {
  localStorage.setItem("watchList", JSON.stringify(watchList));
}, [watchList]);

const fetchMovies = async () => {
  setLoading(true);
  try {
    const response = await fetch(`${url}${searchTerm}`);
    const moviesArr = await response.json();
    if(moviesArr){
      const newMovies = moviesArr.map((movie) => {
      const {id, name, genres, rating, image, summary} = movie.show;
      return {id, name, genres, rating, image, summary};
      });
       setMovies(newMovies);
    }
    else {
      setMovies([])
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}
useEffect(() => {
  fetchMovies();
}, [searchTerm]);
useEffect(() => {
  fetchWatchlist();
}, [watchList])

  return (
    <AppContext.Provider value={{loading, movies, setSearchTerm, watchList, setWatchList, addToWatchList, watchListMovies, removeItem}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
