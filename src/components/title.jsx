import React, { Component } from "react";
import play from "../img/play_button.svg";
class Title extends Component {
  render() {
    return (
      <div>
        <p className="genres">{this.createGenre()}</p>
        <div className="title-container">
          <h2 className="movie-title">
            {this.props.title}
            <img
              src={play}
              alt="triangle with all three sides equal"
              height="47px"
              width="47px"
              className="trailer-button"
            />
          </h2>
        </div>
      </div>
    );
  }
  createGenre = () => {
    const genres = this.props.genre;

    if (genres === undefined) {
      return;
    } else {
      let text = "";

      for (let index = 0; index < genres.length; index++) {
        if (index === genres.length - 1) {
          text = text + genres[index].name;
          break;
        }
        text = text + genres[index].name + " - ";
      }
      return text;
    }
  };
}

export default Title;
