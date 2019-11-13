import React, { Component } from "react";
class Title extends Component {
  render() {
    return (
      <div className="info-content">
        <p>{this.createGenre()}</p>
        <h2>{this.props.title}</h2>
      </div>
    );
  }
  createGenre = () => {
    const genres = this.props.genre;
    if (genres === undefined) {
    } else {
      let text;
      console.log(genres);
      for (let index = 0; index < genres.length; index++) {
        text = text + genres[index].name + " - ";
      }
      return text;
    }

    /*

    */
  };
}

/*
var createGenre = () => {
  const genres = this.props.genre;
  let text;
  for (let index = 0; index < genres.length; index++) {
    text = text + genres[index] + " - ";
  }
  return text;
};
*/

export default Title;
