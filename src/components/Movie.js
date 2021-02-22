import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Movie = ({ id, name, genres, rating, image }) => {
const { setWatchList, watchList, addToWatchList } = useGlobalContext();
  return (
    <article className="movie">
      <div className="img-container">
        <img
          src={
            image
              ? image.original
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png"
          }
          alt={name}
        />
      </div>
      <div className="movie-footer">
        <h3>{name}</h3>
        <h5>
          Average rating: {rating.average ? rating.average : "no ratings"}
        </h5>
        <Link to={`/movie/${id}`} className="btn btn-primary btn-details">
          details
        </Link>
        <button
          className="btn-primary btn-watchlist"
          onClick={() => addToWatchList(id)}
        >
          Add to Watchlist
        </button>
      </div>
    </article>
  );
};

export default Movie;
