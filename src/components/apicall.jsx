import React, { Component } from "react";
import dice from "../img/film.svg";
import filter from "../img/filter.svg";
import Title from "./title";
import Scorebar from "./scorebar";
import Overview from "./overview";
import MovieInfo from "./movieinfo";

class ApiCall extends Component {
  state = {
    error: null,
    isLoaded: false,
    movie: [],
    background: ""
  };

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/27205?api_key=" +
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
  }

  render() {
    console.log(this.state);

    const mystyle = {
      backgroundImage: "url(" + this.state.background + ")"
    };

    return (
      <div className="container">
        <div className="navbar">
          <div className="logo-container">
            <img className="app-logo" src={dice} alt="A pair of dice"></img>
            <h1 className="name">REROLL</h1>
          </div>
          <button className="nav-buttons suggest">SUGGEST A MOVIE</button>
          <button className="nav-buttons filters" value="FILTERS">
            <img className="filter-icon" src={filter} alt="" />
            FILTERS
          </button>
        </div>
        <div className="background" style={mystyle}></div>
        {this.renderInfo()}
      </div>
    );
  }

  renderInfo = () => {
    if (this.state.isLoaded === true) {
      return (
        <div className="content">
          <div className="grid">
            <div className="video-grid"></div>
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
}

export default ApiCall;
