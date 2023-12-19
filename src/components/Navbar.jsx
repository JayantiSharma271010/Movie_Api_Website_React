import React from "react";
import styled from "styled-components";

const Navbar = ({ handleKeyEnter, handleInputChange, value }) => {
  return (
    <Wrapper>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img
              src="https://themebeyond.com/html/movflx/img/logo/logo.png"
              alt=""
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon text-light"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex ms-5 mt-3 ">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Enter movies name"
                aria-label="Search"
                value={value}
                onChange={handleInputChange}
                onClick={handleKeyEnter}
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.section`
  .navbar-container {
    max-width: 90vw;
    margin: auto;
  }

  form {
    max-width: 29rem !important;
    margin: auto !important;
    input {
      min-width: 20rem;
    }
  }

  @media (width <= 426px) {
    input {
      min-width: 10rem !important;
    }

    form {
      margin-top: 0.8rem !important;
    }
  }
`;
