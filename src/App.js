import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tc, setTc] = useState(false);

  //this is using then chain
  /*
  const fetchMoviesHandler = () => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const transformedData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });
        setMovies(transformedData);
      });
  };
  */
  //alternet of then, using async await
  const fetchMoviesHandler = useCallback(async () => {
    console.log("movie fetch");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("use effect");
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No movies found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} showTc={tc} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
