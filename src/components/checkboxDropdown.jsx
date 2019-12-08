import React, { Component } from "react";
import arrow from "../img/arrow.svg";
import checkbox1 from "../img/checkboxOff.svg";
import checkbox2 from "../img/checkboxOn.svg";
import checkbox3 from "../img/checkboxAllOff.svg";
import Checkbox from "@material-ui/core/Checkbox";

const checkboxOff = <img src={checkbox1} className="checkbox-svg" alt="" />;
const checkboxAllOn = (
  <img
    src={checkbox3}
    className="checkbox-svg checkbox-all-on checkbox-active"
    alt=""
  />
);
const checkboxOn = (
  <img src={checkbox2} className="checkbox-svg checkbox-active" alt="" />
);

class CheckboxDropdown extends Component {
  state = {
    dropdownClicked: false,
    genresSelected: [],
    selectAll: false
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
          <p className="dropdown-selected-genres">{this.createTagText()}</p>
          <img className="dropdown-arrow" src={arrow} />
        </div>

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
  createTagText = () => {
    const genreString = this.state.genresSelected.join(", ");
    if (genreString.length > 20) {
      console.log("Hey! You're over the limit: " + genreString);
    }
    return genreString;
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
            <div key={genresList[index]}>
              {this.svgElement(genresList[index], this.state.genresSelected)}
            </div>
          );
          elementArray.push(element);
        }
        // Returns the

        return (
          <div className="options-container">
            <div className="select-all" onClick={this.selectAll}>
              {this.createGenreCheckbox()}
              <p className="select-all-tag">Genres</p>
            </div>
            <div className="dropdown-options-box">{elementArray}</div>
          </div>
        );
      }
    }
  };

  selectAll = () => {
    let genresList = this.props.genres.genres.map(genre => genre.name);

    if (this.state.genresSelected.length > 0) {
      this.setState({ selectAll: false, genresSelected: [] });
    } else if (this.state.selectAll === false) {
      this.setState({ selectAll: true, genresSelected: genresList });
    }
  };

  createGenreCheckbox = () => {
    if (this.state.genresSelected.length === 0) {
      return <React.Fragment>{checkboxOff}</React.Fragment>;
    }
    if (this.state.selectAll === true) {
      return <React.Fragment>{checkboxOn}</React.Fragment>;
    }
    if (this.state.selectAll === false) {
      return <React.Fragment>{checkboxAllOn}</React.Fragment>;
    }
  };

  // Creates the svg elements from the genres
  svgElement = (currentGenre, genresSelected) => {
    if (genresSelected.length === 0) {
      return (
        <div
          data-genre={currentGenre}
          className="checkbox-svg dropdown-options"
          onClick={this.addGenre}
        >
          <label>
            {checkboxOff}

            <p className="genre-tag">{currentGenre}</p>
          </label>
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
          className="checkbox-svg  dropdown-options"
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
          className="checkbox-svg dropdown-options"
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
