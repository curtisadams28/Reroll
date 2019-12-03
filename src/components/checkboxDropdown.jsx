import React, { Component } from "react";
import arrow from "../img/arrow.svg";
import checkbox1 from "../img/checkboxOff.svg";
import checkbox2 from "../img/checkboxOn.svg";
import Checkbox from "@material-ui/core/Checkbox";

const checkboxOff = <img src={checkbox1} className="checkbox-svg" alt="" />;
const checkboxOn = <img src={checkbox2} className="checkbox-svg" alt="" />;

class CheckboxDropdown extends Component {
  state = {
    dropdownClicked: false,
    genresSelected: []
  };
  render() {
    let dropdownBox = "dropdown-box";
    let dropdownName = "dropdown-name";
    if (this.state.dropdownClicked) {
      dropdownBox += " dropdown-box-clicked";
      dropdownName += " dropdown-name-clicked";
    }

    console.log(this.state.genresSelected);

    return (
      <div>
        <div className={dropdownBox} onClick={this.handleClick}>
          <p className={dropdownName}>Genre Including</p>
          <img className="dropdown-arrow" src={arrow} />
        </div>
        <div className="select-all"></div>
        {this.createOptions()}
      </div>
    );
  }

  handleClick = () => {
    if (this.state.dropdownClicked) {
      this.setState({ dropdownClicked: false });
    } else {
      this.setState({ dropdownClicked: true });
    }
  };

  createOptions = () => {
    if (this.state.dropdownClicked) {
      // Checks to see if the genres from the api call are available yet
      if (this.props.genres.genres !== undefined) {
        let genresList = this.props.genres.genres.map(genre => genre.name);
        let elementArray = [];

        // Iterates through the list of genres and builds an array of html elements
        for (let index = 0; index < genresList.length; index++) {
          const element = (
            <div key={genresList[index]} className="dropdown-options">
              {this.svgElement(genresList[index], this.state.genresSelected)}
            </div>
          );
          elementArray.push(element);
        }
        // Returns the

        return (
          <div className="options-container">
            <div className="dropdown-options-box">{elementArray}</div>
          </div>
        );
      }
    }
  };

  // Creates the svg elements from the genres
  svgElement = (currentGenre, genresSelected) => {
    if (genresSelected.length === 0) {
      return (
        <div
          data-genre={currentGenre}
          className="checkbox-svg"
          onClick={this.addGenre}
        >
          {checkboxOff}
          <p className="genre-tag">{currentGenre}</p>
        </div>
      );
    }

    let checkboxActive = false;

    for (let index = 0; index < genresSelected.length; index++) {
      if (currentGenre === genresSelected[index]) {
        checkboxActive = true;
      }
    }

    if (checkboxActive === true) {
      return (
        <div
          data-genre={currentGenre}
          className="checkbox-svg checkbox-active"
          onClick={this.removeGenre}
        >
          {checkboxOn}
          <p className="genre-tag">{currentGenre}</p>
        </div>
      );
    } else {
      return (
        <div
          data-genre={currentGenre}
          className="checkbox-svg"
          onClick={this.addGenre}
        >
          {checkboxOff}
          <p className="genre-tag">{currentGenre}</p>
        </div>
      );
    }
  };

  clickCheck = () => {
    console.log(" clicked");
  };

  addGenre = ev => {
    const genres = this.state.genresSelected;
    genres.push(ev.currentTarget.dataset.genre);
    this.setState({ genresSelected: genres });
  };
  removeGenre = ev => {
    const genreCurrent = ev.currentTarget.dataset.genre;
    const genresSelected = this.state.genresSelected.filter(
      genre => genre !== genreCurrent
    );

    this.setState({ genresSelected: genresSelected });
  };
}

export default CheckboxDropdown;
