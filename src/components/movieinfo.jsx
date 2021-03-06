import React, {Component} from "react";
import ISO6391 from "iso-639-1";

class MovieInfo extends Component {
  render() {
    return (
      <div className="movie-info-container">
        <div className="info-row info-row-top">
          <div className="rating">
            <p className="title">Number of Votes</p>
            <p className="info-text rating-text">{this.getVotes()}</p>
          </div>
          <div className="movie-info language">
            <p className="title">Main Language</p>
            <p className="info-text">{this.getLanguage()}</p>
          </div>
        </div>
        <div className="info-row ">
          <div className="movie-info runtime">
            <p className="title">Runtime</p>
            <p className="info-text runtime-text">{this.getRuntime()}</p>
          </div>
          <div className="movie-info release">
            <p className="title">Year Released</p>
            <p className="info-text">{this.getRelease()}</p>
          </div>
        </div>
      </div>
    );
  }
  // Searches the results for the US rating and returns it.
  getVotes = () => {
    return this.props.votes;
  };
  // Finds the full language name based on the language code
  getLanguage = () => {
    const langcode = this.props.language;
    const language = ISO6391.getName(langcode);

    return language;
  };
  // Takes the runtime from the api call and converts it into hh:mm format
  getRuntime = () => {
    const onlyminutes = this.props.runtime / 60;
    const hours = Math.floor(onlyminutes);
    const minutes = Math.floor((onlyminutes - hours) * 60);
    return hours + "h " + minutes + "min";
  };
  // Gets the release date
  getRelease = () => {
    const date = this.props.release.substring(0, 4);

    return date;
  };
}

export default MovieInfo;
