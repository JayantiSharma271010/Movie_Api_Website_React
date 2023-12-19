import React, { useEffect, useRef } from "react";
import { useMovieContext } from "../MovieContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { RiMovieLine } from "react-icons/ri";
import { CiTimer } from "react-icons/ci";

const MovieDetails = () => {
  const { movies, base_url, Api_Key, getGenreNames } = useMovieContext();
  const [movieDetails, setMovieDetails] = useState([]);
  const [getMovieTime, setGetMovieTime] = useState("");
  const lastWordRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    if (movieDetails && movieDetails.runtime) {
      const time = movieDetails.runtime;
      const hour = Math.floor(time / 60);
      const min = time % 60;
      setGetMovieTime({ hour, min });
    }
  }, [movieDetails]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${base_url}/movie/${id}?api_key=${Api_Key}&append_to_response=videos`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchMovieDetails();
  }, [id, base_url]);

  const getLastWordStyled = (title) => {
    const words = title.split(" ");
    const lastWord = words[words.length - 1];
    const styledLastword = {
      color: "#e4d80d ",
    };
    return (
      <span>
        {words.slice(0, -1).join(" ")}{" "}
        <span style={styledLastword}>{lastWord}</span>
      </span>
    );
  };

  console.log(movieDetails);
  return (
    <Wrapper className="movieDetails-container " key={movieDetails.id}>
      <div className="bg-overlay"></div>
      <div className="container px-3 px-sm-0 position-relative ">
        <div className="row d-flex align-content-center flex-wrap position-absolute row-wrapper">
          <div className="col-xl-3 col-lg-5 col-md-7 col-sm-8 m-auto">
            {" "}
            {movieDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
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
          <div className="col-lg-5 col-md-10 ms-md-5 mt-sm-4 mt-md-0">
            <div className="content-container text-white">
              <h5 className="span-yellow fs-26 fw-bolder">New Episodes</h5>
              <h2 className="fs-60 text-white  movie-title h2">
                {movieDetails && movieDetails.title
                  ? getLastWordStyled(movieDetails.title)
                  : []}
              </h2>
              <div className="banner-meta my-4 ">
                <ul className="d-flex flex-md-nowrap p-0  my-md-4">
                  <li className="qualtiy ">
                    <span className="bg-light  text-dark small fw-bold p-1">
                      PG 18
                    </span>
                    <span className="border border-light small ms-2 p-1">
                      HD
                    </span>
                  </li>

                  <li className="genreNames ms-3">
                    {movieDetails &&
                      movieDetails.genres &&
                      movieDetails.genres.map((genre) => (
                        <span>{genre.name}</span>
                      ))}
                  </li>
                  <li className="release-time ms-3 d-flex gap-sm-3 flex-row">
                    <span className="column">
                      <FaCalendarAlt className="color-yellow" />
                      <span>
                        {" "}
                        {new Date(movieDetails.release_date).getFullYear()}
                      </span>
                    </span>
                    <span className="column">
                      <CiTimer className="color-yellow" />
                      <span className="fw-bold ">
                        {getMovieTime.hour}hr {getMovieTime.min}min
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              <p className="movie-overview lh-2">{movieDetails.overview}</p>
              <div className="movie-details-prime py-3 px-3 rounded shadow">
                <ul className="p-0 d-flex gap-2 ">
                  <li className="share d-flex flex-column ">
                    <CiShare2 className="fs-4 fw-bolder" />
                    <span>Share</span>
                  </li>
                  <li className="streaming">
                    <h6 className="m-0  fw-bold">Prime Video</h6>
                    <span className="small">Streaming Channels</span>
                  </li>
                  <li className="stream-btn text-center">
                    <button className="rounded-pill ">
                      <RiMovieLine />{" "}
                      <span className="small fw-bold text-uppercase ms-1">
                        Watch now
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-5 position-relative">
            <div className="downlaod-btn-container ps-md-4 position-absolute  w-100">
              <div className="d-btn text-center rounded">
                <span className="text-uppercase fw-bold ">Download </span>
                <img
                  src="https://themebeyond.com/html/movflx/fonts/download.svg"
                  alt=""
                  className="img-fluid downlaod-icon mx-md-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MovieDetails;

const Wrapper = styled.section`
  background: #0e0e0e;
  min-height: 100vh;
  width: 100%;
  position: relative;
  &::before {
    content: "";
    position: fixed;
    background: url("https://png.pngtree.com/background/20230606/original/pngtree-old-movie-posters-on-the-wall-picture-image_2882816.jpg");
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  .bg-overlay {
    background: rgba(0, 0, 0, 0.812);
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 100%;
    height: fit-content;
    z-index: 10;
  }

  .container {
    z-index: 99;
    position: relative;
  }

  .row-wrapper {
    top: 10rem;
  }
  .span-yellow {
    color: #e4d80d !important;
  }

  .movie-title {
    font-weight: 800;
    &:last-word {
      color: #e4d80d !important;
    }
  }

  .banner-meta,
  .movie-details-prime {
    li {
      list-style: none;
    }
  }

  .genreNames {
    span {
      &:nth-child(2) {
        &::before {
          content: " , ";
        }
      }
    }
  }
  .release-time {
    .column {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  }

  .movie-overview {
    color: #bcbcbc;
  }

  .movie-details-prime {
    background: #242c38;
    max-width: 475px;
    ul {
      align-items: center;
      justify-content: space-between;
      margin: 0 !important;
    }
  }

  .share {
    justify-content: center;
    align-items: center;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0.5px;
      height: 48px;
      background: #fff;
      z-index: 99;
      top: 0;
      right: -25px;
      opacity: 0.15;
    }
  }

  .stream-btn {
    span {
      font-size: 10px;
    }
    button {
      border: 1px solid #e4d80d;
      padding: 0.5rem 1.7rem;

      &:hover {
        background: #e4d80d;
        color: #0e0e0e;
        font-weight: 900 !important;
      }
    }
  }

  .downlaod-btn-container {
    transform: rotate(90deg);
    bottom: 18%;
    .d-btn {
      background: #e4d80d;
      padding: 43px 49px;
      max-width: 16rem;
    }

    span {
      letter-spacing: 3px;
      font-size: 12px;
    }
  }
  .downlaod-icon {
    width: 23px;
    transform: rotate(-90deg);
  }

  @media (width <= 769px) {
    .downlaod-btn-container {
      transform: rotate(0);
      bottom: -20%;
      position: static !important;
      margin: 3rem 0 !important;
      .d-btn {
        padding: 16px 49px;
      }
    }
    .downlaod-icon {
      transform: rotate(0deg);
    }

    .row-wrapper {
      top: 3rem;
    }

    .banner-meta {
      ul {
        display: flex;
        flex-wrap: wrap !important;
      }

      .release-time {
        margin: 0.5rem auto;
      }
    }
  }

  @media (width <= 321px) {
    .fs-60 {
      font-size: 35px;
    }
    .fs-26 {
      font-size: 20px;
    }
  }

  @media (width <= 426px) {
    .fs-60 {
      font-size: 40px;
    }
    .fs-26 {
      font-size: 20px;
    }
  }
  @media (width < 1025px){
    ul {
        display: flex;
        flex-wrap: wrap !important;
      }
      .downlaod-btn-container {
      transform: rotate(0);
      bottom: -20%;
      position: static !important;
      margin: 3rem 3rem;
      .d-btn {
        padding: 16px 49px;
      }
    }
    .downlaod-icon {
      transform: rotate(0deg);
    }
  }
`;
