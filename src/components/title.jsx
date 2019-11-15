import React, { Component } from "react";
class Title extends Component {
  render() {
    return (
      <div className="info-content">
        <p className="genres">{this.createGenre()}</p>
        <h2 className="movie-title">{this.props.title}</h2>
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
