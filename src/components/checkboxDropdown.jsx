import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";
import arrow from "../img/arrow.svg";
import checkbox1 from "../img/checkboxOff.svg";
import checkbox2 from "../img/checkboxOn.svg";
import checkbox3 from "../img/checkboxAllOff.svg";
import Checkbox from "@material-ui/core/Checkbox";

const checkboxOff = (
  <img
    src={require("../img/checkboxOff.svg")}
    className="checkbox-svg"
    alt=""
  />
);

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
    selectAll: false,
    allRemoved: false
  };
  render() {
    let dropdownBox = "dropdown-box";
    let dropdownName = "dropdown-name";
    if (this.state.dropdownClicked) {
      dropdownBox += " dropdown-box-clicked";
      dropdownName += " dropdown-name-clicked";
    }

    return (
      <div className="filter-item">
        <div
          className={dropdownBox + " checkbox-dropdown-box"}
          onClick={this.handleClick}
        >
          <p className={`dropdown-name ${this.dropdownStateClasses()}`}>
            Selected Genres
          </p>
          <p className="dropdown-selected-genres">{this.createTagText()}</p>
          <img
            className={`dropdown-arrow dropdown-arrow${
              this.state.dropdownClicked ? "-clicked" : "-not-clicked"
            }`}
            src={arrow}
          />
          <div
            className={`dropdown-underline dropdown-underline${
              this.state.dropdownClicked ? "-clicked" : "-not-clicked"
            }`}
          ></div>
        </div>

        {this.createOptions()}
      </div>
    );
  }

  handleClick = e => {
    console.log("dropdown clicked");
    if (this.state.dropdownClicked) {
      this.setState({dropdownClicked: false});
    } else {
      this.props.addDocumentListener(this.props.inputElement);
      this.setState({dropdownClicked: true, allRemoved: false});
    }
  };
  outsideClick = () => {
    console.log("outside click triggered");

    this.setState({dropdownClicked: false});
  };

  // Checks to see what the state of the dropdown is so that it can apply the appropriate class and trigger an animation.
  dropdownStateClasses = () => {
    const genresSelected = this.state.genresSelected.length;
    let clicked = this.state.dropdownClicked;

    if (clicked === true && this.state.allRemoved === true) {
      return "dropdown-all-removed";
    } else if (clicked === true && genresSelected === 0) {
      return "dropdown-on";
    } else if (clicked === false && genresSelected === 0) {
      return "dropdown-off";
    } else if (clicked === true && genresSelected > 0) {
      return "dropdown-selected-on";
    } else if (clicked === false && genresSelected > 0) {
      return "dropdown-selected-off";
    }
  };

  createTagText = () => {
    const genreString = this.state.genresSelected.join(", ");
    return genreString;
  };

  createOptions = () => {
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
        <CSSTransition
          in={this.state.dropdownClicked}
          appear={this.state.dropdownClicked}
          timeout={250}
          classNames="slide"
          unmountOnExit
        >
          <div
            className={`options-container options-container${
              this.state.dropdownClicked ? "-clicked" : "-not-clicked"
            }`}
          >
            <div className="select-all" onClick={this.selectAll}>
              {this.createGenreCheckbox()}
              <p className="select-all-tag">Genres</p>
            </div>
            <div className="dropdown-options-box">{elementArray}</div>
          </div>
        </CSSTransition>
      );
    }
  };

  selectAll = () => {
    let genresList = this.props.genres.genres.map(genre => genre.name);

    if (this.state.genresSelected.length > 0) {
      this.setState({selectAll: false, genresSelected: []});
    } else if (this.state.selectAll === false) {
      this.setState({selectAll: true, genresSelected: genresList});
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

  addGenre = ev => {
    const genres = this.state.genresSelected;
    genres.push(ev.currentTarget.dataset.genre);
    this.setState({genresSelected: genres, allRemoved: false});
  };
  removeGenre = ev => {
    const genreCurrent = ev.currentTarget.dataset.genre;
    const genresSelected = this.state.genresSelected.filter(
      genre => genre !== genreCurrent
    );

    if (genresSelected.length === 0) {
      this.setState({allRemoved: true, genresSelected: genresSelected});
    } else {
      this.setState({allRemoved: false, genresSelected: genresSelected});
    }
  };
}

export default CheckboxDropdown;
