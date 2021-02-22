import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";
const url = "https://api.tvmaze.com/shows/";

const SingleMovie = () => {
  const { setWatchList, watchList, addToWatchList } = useGlobalContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setLoading(true);
    const findMovie = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const movie = await response.json();
        if(movie){
        const {name, language, genres, premiered, rating, image, summary} = movie;
        const newMovie = {name, language, genres, premiered, rating, image, summary};
        setMovie(newMovie);
        }
        else{
        setMovie(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    findMovie();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!movie) {
    return <h2 className="section-title">no movie/show to display</h2>;
  }
  const { name, language, genres, premiered, rating, image, summary } = movie;
  return (
    <section className="section movie-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <button
        className="btn btn-primary btn-watchlist-showpage"
        onClick={() => addToWatchList(id)}
      >
        Add to Watchlist
      </button>
      <h2 className="section-title">{name}</h2>
      <div className="show">
        <img
          src={
            image
              ? image.original
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png"
          }
          alt={name}
        />
        <div className="show-info">
          <p>
            <span className="show-data">name:</span>
            {name}
          </p>
          {genres.length ? (
            <p>
              <span className="show-data">Genre:</span>
              {genres.map((genre, index) => {
                return <span key={index}>{genre}</span>;
              })}
            </p>
          ) : null}
          <p>
            <span className="show-data">Language:</span>
            {language ? language : "no info"}
          </p>
          <p>
            <span className="show-data">Premiered:</span>
            {premiered}
          </p>
          <p>
            <span className="show-data">Rating:</span>
            {rating.average ? rating.average : "not available"}
          </p>
          <p>
            <span className="show-data">Description:</span>
            <span dangerouslySetInnerHTML={{ __html: summary }} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
