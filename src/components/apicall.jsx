import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";

// Components
import Title from "./title";
import Scorebar from "./scorebar";
import Overview from "./overview";
import Filters from "./filters";
import Background from "./background";

// Images
import dice from "../img/film.svg";
import filter from "../img/filter.svg";
import close from "../img/close.svg";
import cancel from "../img/cancel.svg";

class ApiCall extends Component {
  state = {
    error: null,
    isLoaded: false,
    movie: [],
    background: "",
    backgroundChange: false,
    menuIsActive: false,
    movieGenres: [],
    suggestClicked: false,
    queryString: "",
    trailerActive: false,
    trailerId: "",
    fetchError: false,
    errorMessage: "",
    trailerFound: "",
  };

  componentDidMount() {
    this.suggestMovie("");

    // Gets the available genres from the api for the genre filter
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          movieGenres: result,
        });
      });
  }

  render() {
    return (
      <div className="container" ref="containerRef">
        <div className="navbar">
          <div className="logo-container">
            <img className="app-logo" src={dice} alt="A pair of dice"></img>
            <h1 className="name">REROLL</h1>
          </div>
          <button className="nav-buttons suggest" onClick={this.suggestClicked}>
            <p>SUGGEST A MOVIE</p>
          </button>
          <button
            onClick={this.handleButton}
            className="nav-buttons filters"
            value="FILTERS"
          >
            <img
              className="filter-icon"
              src={this.state.menuIsActive ? close : filter}
              alt=""
            />
            FILTERS
          </button>
        </div>
        <div className="image-container">
          <Background background={this.state.background} />
        </div>
        <Filters
          menuIsActive={this.state.menuIsActive}
          genres={this.state.movieGenres}
          suggestClicked={this.state.suggestClicked}
          sendQueryString={this.sendQueryString}
        />
        ;{this.renderInfo()}
        {this.renderTrailer()}
      </div>
    );
  }

  renderInfo = () => {
    // The movie info will only be displayed if the api call got a response
    if (!this.state.fetchError) {
      if (this.state.isLoaded) {
        return (
          <div className="content">
            <div className={`grid ${this.removeContent()}`}>
              <div className="info-grid">
                <div className="info-content">
                  <Title
                    title={this.state.movie.title}
                    genre={this.state.movie.genre_ids}
                    genreList={this.state.movieGenres.genres}
                    date={this.state.movie.release_date}
                  />
                  <Scorebar score={this.state.movie.vote_average} />
                  <Overview overview={this.state.movie.overview} />
                  <button
                    onClick={this.trailerActive}
                    className="watch-trailer fill"
                  >
                    <span>Watch Trailer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <p className="fetch-error-message">{this.state.errorMessage}</p>;
    }
  };

  renderTrailer = () => {
    if (this.state.trailerActive) {
      return (
        <CSSTransition
          in={this.state.trailerActive}
          timeout={1000}
          classNames="fade-in"
        >
          <div className="trailer-container">
            <div className="close-button-container">
              <img
                src={cancel}
                fill="white"
                alt="close button"
                onClick={this.closeTrailer}
              />
            </div>
            {this.trailerErrorCheck()}
          </div>
        </CSSTransition>
      );
    }
  };

  // Checks if the url for the trailer exists and displays error message if it doesn't.
  trailerErrorCheck = () => {
    if (this.state.trailerFound) {
      return (
        <iframe
          className="video"
          color="white"
          src={
            "https://www.youtube.com/embed/" +
            this.state.trailerId +
            "?autoplay=1&showinfo=0&fs=1;"
          }
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          title="Movie Trailer"
        ></iframe>
      );
    } else {
      return (
        <div className="video">
          <p className="trailer-error-message">No trailer found</p>
        </div>
      );
    }
  };

  suggestClicked = () => {
    this.suggestClickedState();
  };

  suggestClickedState = () => {
    this.setState({suggestClicked: true});
  };
  backgroundChange = () => {
    if (this.state.backgroundChange) {
      this.setState({backgroundChange: false});
    } else {
      this.setState({backgroundChange: true});
    }
  };
  suggestMovie = (query) => {
    // This first fetch is to get the number of pages from the api
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&include_adult=false${query}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.total_pages;
      })
      .then((total_pages) => {
        if (total_pages === 0) {
          throw "Couldn't find any results";
        }
        let pageQuery = `&page=${Math.ceil(Math.random() * total_pages)}`;

        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&include_adult=false${pageQuery}${query}`
        )
          // Error checking. See catch at the bottom of the fetch request
          .then((res) => {
            return res.json();
          })

          .then((res) => {
            const arraySelection = Math.floor(
              Math.random() * res.results.length
            );

            let movObj = res.results[arraySelection];

            return movObj;
          })

          .then((movObj) => {
            // Fetches the trailer url from the movie id (taken from the fetch request above)
            fetch(
              "https://api.themoviedb.org/3/movie/" +
                movObj.id +
                "/videos?api_key=" +
                process.env.REACT_APP_MOVIE_API_KEY
            )
              .then((res) => res.json())
              .then(
                (result) => {
                  let trailerKey;
                  let trailerFound;
                  if (result.results.length === 0) {
                    trailerFound = false;
                    trailerKey = null;
                  } else {
                    trailerFound = true;
                    trailerKey = result.results[0].key;
                  }

                  this.setState({
                    trailerId: trailerKey,
                    fetchError: false,
                    trailerFound: trailerFound,
                    movie: movObj,
                    isLoaded: true,
                    background:
                      "https://image.tmdb.org/t/p/original" +
                      movObj.backdrop_path,
                  });
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error,
                  });
                }
              );
          });
      })
      .catch((err) => {
        this.setState({
          fetchError: true,
          errorMessage: err,
          trailerActive: false,
        });
      });
  };
  trailerActive = () => {
    this.setState({trailerActive: true});
  };

  closeTrailer = () => {
    this.setState({trailerActive: false});
  };
  handleButton = () => {
    if (this.state.menuIsActive === false) {
      this.setState({
        menuIsActive: true,
      });
    } else {
      this.setState({
        menuIsActive: false,
      });
    }
  };
  removeContent = () => {
    if (this.state.menuIsActive) {
      return "grid-off";
    }
  };
  sendQueryString = (query) => {
    this.suggestMovie(query);
    this.setState({suggestClicked: false});
  };
}

export default ApiCall;
