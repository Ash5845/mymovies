import React from "react";
import WatchlistMovie from "./Watchlist-movie"
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Watchlist = () => {
const { loading, watchList, watchListMovies, setWatchList} = useGlobalContext();
    if (loading) {
      return <Loading />;
    }
    if (watchList.length < 1) {
      return (
        <>
          <h2 className="section-title">
            Oh no, there's nothing in your watchlist
          </h2>
          <div className="watchlistBtn-container">
            <Link to="/" className="btn-primary btn-center-watchlist">
              back home
            </Link>
          </div>
        </>
      );
    }
    return (
      <section className="section">
        <div className="watchlistBtn-container">
          <Link to="/" className="btn-primary btn-center-watchlist">
            back home
          </Link>
        </div>
        <h2 className="section-title">My Watchlist</h2>
        <div className="movies-center">
          {watchListMovies.map((movie, index) => {
            return <WatchlistMovie key={index} {...movie} />;
          })}
        </div>
        <div className="watchlistBtn-container">
          <button
            onClick={() => setWatchList([])}
            className="btn-primary btn-center-watchlist"
          >
            Clear Watchlist
          </button>
        </div>
      </section>
    );
};

export default Watchlist;
