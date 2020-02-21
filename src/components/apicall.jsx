import React, {Component} from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";

// Components
import Title from "./title";
import Scorebar from "./scorebar";
import Overview from "./overview";
import MovieInfo from "./movieinfo";
import Filters from "./filters";
import Background from "./background";

// Images
import dice from "../img/film.svg";
import filter from "../img/filter.svg";
import play from "../img/play_button.svg";
import arrow from "../img/next.svg";
import close from "../img/cancel.svg";

class ApiCall extends Component {
  state = {
    error: null,
    error1: null,
    isLoaded: false,
    isLoaded1: false,
    movie: [],
    background: "",
    backgroundChange: false,
    menuIsActive: false,
    movieGenres: [],
    suggestClicked: false,
    queryString: "",
    trailerActive: false,
    trailerId: ""
  };

  componentDidUpdate() {
    //const listLength = movieObject.results.length;
    //console.log(this.state.movie);
    //console.log(this.state.movieList);
    //console.log(this.state.suggestClicked);
  }

  componentDidMount() {
    //console.log(this.containerRef);
    /*
    fetch(
      "https://api.themoviedb.org/3/movie/299534?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY +
        "&append_to_response=release_dates"
    )
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          movie: result,
          background:
            "https://image.tmdb.org/t/p/original" + result.backdrop_path
        });
      });
      */
    this.suggestMovie("");

    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY
    )
      .then(res => res.json())
      .then(result => {
        this.setState({
          movieGenres: result
        });
      });
  }

  render() {
    /*
    const backgroundImage = {
      backgroundImage: `${this.state.background}`
    };

    console.log(backgroundImage);
    */

    return (
      <div className="container" ref="containerRef">
        <div className="navbar">
          <div className="logo-container">
            <img className="app-logo" src={dice} alt="A pair of dice"></img>
            <h1 className="name">REROLL</h1>
          </div>
          <button className="nav-buttons suggest" onClick={this.suggestClicked}>
            SUGGEST A MOVIE
          </button>
          <button
            onClick={this.handleButton}
            className="nav-buttons filters"
            value="FILTERS"
          >
            <img className="filter-icon" src={filter} alt="" />
            FILTERS
          </button>
        </div>

        <div className="image-container">
          {/*<img className="background" src={this.state.background}></img>>*/}
          <Background background={this.state.background} />
        </div>

        {this.renderInfo()}
        {this.renderTrailer()}
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
            suggestClicked={this.state.suggestClicked}
            sendQueryString={this.sendQueryString}
          />
          <div className={`grid ${this.removeContent()}`}>
            <div className="info-grid">
              <div className="info-content">
                <Title
                  title={this.state.movie.original_title}
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
  };

  renderTrailer = () => {
    if (this.state.trailerActive) {
      //console.log(this.state.movie.id);
      return (
        <CSSTransition
          in={this.state.trailerActive}
          timeout={1000}
          classNames="fade-in"
        >
          <div className="trailer-container">
            <div className="close-button-container">
              <img src={close} alt="close button" onClick={this.closeTrailer} />
            </div>

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
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
            ></iframe>
          </div>
        </CSSTransition>
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

  suggestMovie = query => {
    let queryFull = `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&include_adult=false${query}`;
    console.log(query);
    let moviesResult;
    /*
    fetch(queryFull)
      .then(res => res.json())
      .then(
        result => {
          const arrayLength = Math.floor(
            Math.random() * result.results.length + 1
          );
          let movObj = result.results[arrayLength];

          this.setState({
            movie: movObj,
            isLoaded: true,
            background:
              "https://image.tmdb.org/t/p/original" + movObj.backdrop_path
          });
        },
        error => {
          console.log(error);
        }
      );
      */
    fetch(queryFull)
      .then(res => res.json())

      .then(result => {
        const arraySelection = Math.floor(
          Math.random() * result.results.length + 1
        );
        let movObj = result.results[arraySelection];
        return movObj;
      })

      .then(movObj => {
        //console.log(movObj);

        // Fetches the trailer url from the movie id (taken from the fetch request above)
        fetch(
          "https://api.themoviedb.org/3/movie/" +
            movObj.id +
            "/videos?api_key=" +
            process.env.REACT_APP_MOVIE_API_KEY
        )
          .then(res => res.json())
          .then(
            result => {
              //console.log(result);

              this.setState({
                trailerId: result.results[0].key,
                movie: movObj,
                isLoaded: true,
                background:
                  "https://image.tmdb.org/t/p/original" + movObj.backdrop_path
              });
            },
            error => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          );
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
        menuIsActive: true
      });
    } else {
      this.setState({
        menuIsActive: false
      });
    }
  };
  removeContent = () => {
    if (this.state.menuIsActive) {
      return "grid-off";
    }
  };
  sendQueryString = query => {
    this.suggestMovie(query);
    this.setState({suggestClicked: false});
  };
}

export default ApiCall;
