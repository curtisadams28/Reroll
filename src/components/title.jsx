import React, {Component} from "react";

class Title extends Component {
  render() {
    return (
      <div>
        <p className="genres">{this.createGenre()}</p>
        <div className="title-container">
          <h2 className="movie-title">
            {this.props.title}{" "}
            <div className="release-year">
              <p className="release-year-text">
                {this.props.date.substring(0, 4)}
              </p>
            </div>
          </h2>
        </div>
      </div>
    );
  }
  // Gets the genre names and combines them into a string seperated by "-"
  createGenre = () => {
    const genreId = this.props.genre;
    const genreList = this.props.genreList;
    let genreString;
    if (genreId === undefined) {
      return;
    } else {
      for (const id of genreId) {
        let genre = this.props.genreList.find(element => element.id === id);
        if (genreString === undefined) {
          genreString = genre.name;
        } else {
          genreString = genreString + "-" + genre.name;
        }
      }
      return genreString;
    }
  };
}

export default Title;
