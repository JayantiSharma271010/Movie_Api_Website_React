import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [getGenreNames, setGetGenreNames] = useState("");
  const [currentpage, setCurrentpage] = useState(1);
  const Api_Key = "291096625263ef1b8134d09760393c1d";
  const base_url = "https://api.themoviedb.org/3";

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(
          `${base_url}/search/movie?api_key=${Api_Key}&query=${query}&page=${currentpage}`
        );

        const moviesData = response.data.results;

        const moviewithCase = await Promise.all(
          moviesData.map(async (movie) => {
            try {
              const castResponse = await axios.get(
                `${base_url}/movie/${movie.id}/credits?api_key=${Api_Key}`
              );
              return { ...movie, cast: castResponse.data.cast };
            } catch (error) {
              console.error(`Error: ${error}`);
              return { ...movie, cast: [] };
            }
          })
        );
        const genreResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=291096625263ef1b8134d09760393c1d`
        );
        setGetGenreNames(genreResponse.data.genres);
        setMovies(moviewithCase);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    if (query.trim() !== "") {
      searchMovies();
    } else {
      searchMovies([]);
    }
  }, [currentpage, query, Api_Key, base_url]);

  // console.log(genreResponse);

  function handelInputChange(event) {
    setQuery(event.target.value);
  }

  function handleKeyEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery(event.target.value);
    }
  }

  function handlePrevPage() {
    setCurrentpage(currentpage - 1);
  }
  function handleNextPage() {
    setCurrentpage(currentpage + 1);
  }

  const ContextValue = {
    query,
    handlePrevPage,
    handleNextPage,
    handleKeyEnter,
    handelInputChange,
    movies,
    Api_Key,
    base_url,
    getGenreNames,
  };

  return (
    <MovieContext.Provider value={ContextValue}>
      {children}
    </MovieContext.Provider>
  );
};

const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export { MovieProvider, useMovieContext };
