import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Cards = ({ movies }) => {
  return (
    <Wrapper>
      <div className="card-container container-md ">
        <div className="py-4 "></div>
        <div className="d-grid ">
          {movies.map((movie) => (
            <div className="card shadow my-4 mx-sm-2 m-auto" key={movie.id}>
              <div className="image-container">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="fetched Image"
                    className="img-fluid"
                  />
                ) : (
                  <img
                    src={`https://static.vecteezy.com/system/resources/previews/022/059/000/large_2x/no-image-available-icon-vector.jpg`}
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="card-body py-3">
                <div className="d-flex justify-content-between align-content-center flex-wrap">
                  <Link to={`/movie/${movie.id}`}>
                    <h5 className="card-title text-white">{movie.title}</h5>
                  </Link>

                  <h6 className="movie-date">
                    {new Date(movie.release_date).getFullYear()}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Cards;

const Wrapper = styled.section`
  .card {
    max-width: 22rem !important;
    max-height: 27rem;
    padding: 0 !important;
    background: transparent;
  }
  .d-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .image-container {
    height: 84%;
  }
  img {
    height: 100%;
    width: 100%;
  }

  .movie-date {
    color: #e4d80d !important;
  }

  .card-title {
    &:hover {
      color: #e4d80d !important;
    }
  }
  @media (width <= 769px) {
    .d-grid {
      grid-template-columns: 1fr 1fr;
    }

    img {
      height: 55%;
    }

    .card {
      max-width: 20rem !important;
      max-height: 30rem;
    }

    .card-text {
      font-size: 0.9rem;
    }
  }
  @media (width <= 426px) {
    .d-grid {
      grid-template-columns: 1fr;
    }

    img {
      height: 55%;
      width: 230px;
    }

    .card {
      max-width: 20rem !important;
      max-height: 30rem;
    }

    .card-text {
      font-size: 0.9rem;
    }
  }
`;
