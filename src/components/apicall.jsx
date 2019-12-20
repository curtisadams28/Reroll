import React, { Component } from "react";
import ReactDOM from "react-dom";

// Components
import Title from "./title";
import Scorebar from "./scorebar";
import Overview from "./overview";
import MovieInfo from "./movieinfo";
import Filters from "./filters";

// Images
import dice from "../img/film.svg";
import filter from "../img/filter.svg";

class ApiCall extends Component {
  state = {
    error: null,
    error1: null,
    isLoaded: false,
    isLoaded1: false,
    movie: [],
    background: "",
    menuIsActive: false,
    movieGenres: []
  };

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/299534?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY +
        "&append_to_response=release_dates"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            movie: result,
            background:
              "https://image.tmdb.org/t/p/original" + result.backdrop_path
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            movieGenres: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const backgroundImage = {
      backgroundImage: "url(" + this.state.background + ")"
    };
    //console.log(this.state);

    return (
      <div className="container">
        <div className="navbar">
          <div className="logo-container">
            <img className="app-logo" src={dice} alt="A pair of dice"></img>
            <h1 className="name">REROLL</h1>
          </div>
          <button className="nav-buttons suggest">SUGGEST A MOVIE</button>
          <button
            onClick={this.handleButton}
            className="nav-buttons filters"
            value="FILTERS"
          >
            <img className="filter-icon" src={filter} alt="" />
            FILTERS
          </button>
        </div>
        <div className="background" style={backgroundImage}></div>

        {this.renderInfo()}
      </div>
    );
  }

  renderInfo = () => {
    // The movie info will only be displayed if the api call got a response
    if (this.state.isLoaded === true) {
      return (
        <div className="content">
          <Filters
            menuIsActive={this.state.menuIsActive}
            genres={this.state.movieGenres}
          />
          <div className="grid">
            <div className="info-grid">
              <div className="info-content">
                <Title
                  title={this.state.movie.original_title}
                  genre={this.state.movie.genres}
                />
                <Scorebar score={this.state.movie.vote_average} />
                <Overview overview={this.state.movie.overview} />
                <MovieInfo
                  rating={this.state.movie.release_dates}
                  language={this.state.movie.original_language}
                  runtime={this.state.movie.runtime}
                  release={this.state.movie.release_date}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  suggestMovie = () => {};
  handleButton = () => {
    if (this.state.menuIsActive === false) {
      this.setState({
        menuIsActive: true
      });
    } else {
      this.setState({
        menuIsActive: false
      });
    }
  };
}

export default ApiCall;
