import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import { MovieProvider } from "./MovieContext.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <Router>
    <MovieProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </MovieProvider>
  </Router>,
  document.getElementById("root")
);
