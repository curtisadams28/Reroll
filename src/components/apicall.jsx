import React, { Component } from "react";
import dice from "../img/film.svg";
import filter from "../img/filter.svg";
import Title from "./title";

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
        "&external_id=27205"
    )
      .then(res => res.json())
      .then(
        result => {
          //console.log(result.backdrop_path);

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
    //console.log(this.state);

    //console.log(background);
    //<img className="background-img" src={this.state.background} alt="" />
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
        <div className="content">
          <div className="grid">
            <div className="video-grid">viddeo grid</div>
            <div className="info-grid">
              <div className="info-content">
                <Title
                  title={this.state.movie.original_title}
                  genre={this.state.movie.genres}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
            background:
              "https://image.tmdb.org/t/p/original" + result.backdrop_path*/

export default ApiCall;
