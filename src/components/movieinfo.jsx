import React, { Component } from "react";
import ISO6391 from "iso-639-1";
import { thisExpression } from "@babel/types";

class MovieInfo extends Component {
  render() {
    return (
      <div className="movie-info-container">
        <div className="movie-info rating">
          <p className="title">Rating (US)</p>
          <p className="info-text">{this.getRating()}</p>
        </div>
        <div className="movie-info language">
          <p className="title">Main Language</p>
          <p className="info-text">{this.getLanguage()}</p>
        </div>
        <div className="movie-info runtime">
          <p className="title">Runtime</p>
          <p className="info-text">{this.getRuntime()}</p>
        </div>
        <div className="movie-info release">
          <p className="title">Year Released</p>
          <p className="info-text">{this.getRelease()}</p>
        </div>
      </div>
    );
  }
  getRating = () => {
    const result = this.props.rating.results.filter(
      lang => lang.iso_3166_1 === "US"
    );

    const rating = result[0].release_dates[0].certification;
    if (rating === "") {
      return "NR";
    } else {
      return rating;
    }
  };
  getLanguage = () => {
    const langcode = this.props.language;
    const language = ISO6391.getName(langcode);

    return language;
  };
  getRuntime = () => {
    const onlyminutes = this.props.runtime / 60;
    const hours = Math.floor(onlyminutes);
    const minutes = Math.floor((onlyminutes - hours) * 60);
    return hours + "h " + minutes + "min";
  };
  getRelease = () => {
    const date = this.props.release.substring(0, 4);
    return date;
  };
}

export default MovieInfo;
