import React from "react";
import Loading from "./Loading";
import Movie from "./Movie";
import { useGlobalContext } from "../context";


const MovieList = () => {
  const { loading, movies } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if(movies.length < 1){
      return(
          <h2 className="section-title">No movies or shows matched your search</h2>
      )
  }
  return (
    <section className="section">
      <h2 className="section-title">Movies/Shows</h2>
      <div className="movies-center">
      {movies.map((movie) => {
          return <Movie key={movie.id} {...movie}/>
      })}
      </div>
    </section>
  );
};

export default MovieList;
