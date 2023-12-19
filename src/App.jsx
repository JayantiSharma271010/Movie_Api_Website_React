import { styled } from "styled-components";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import { useMovieContext } from "./MovieContext";

import "./App.css";

function App() {
  const {
    query,
    movies,
    handelInputChange,
    handleKeyEnter,
    handleNextPage,
    handlePrevPage,
  } = useMovieContext();

  return (
    <Wrapper>
      <header>
        <Navbar
          value={query}
          handleInputChange={handelInputChange}
          handleKeyEnter={handleKeyEnter}
        />
      </header>

      <main className="main-container">
        <Cards movies={movies} />

        {movies.length !== 0 ? (
          <div className="btn-group d-flex justify-content-center gap-3">
            <button className="btn-secondary " onClick={handlePrevPage}>
              Prev
            </button>
            <button className="btn-secondary" onClick={handleNextPage}>
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="backToTop"></div>
      </main>
      <div className="py-2 py-sm-3"></div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  .main-container {
    background: #0e0e0e;
    height: 95%;
    padding: 2rem 0;
  }
`;

export default App;
