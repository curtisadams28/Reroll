import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";
import arrow from "../img/arrow.svg";
import checkbox1 from "../img/checkboxOff.svg";
import checkbox2 from "../img/checkboxOn.svg";
import checkbox3 from "../img/checkboxAllOff.svg";
import Checkbox from "@material-ui/core/Checkbox";

const checkboxOff = (
  <svg
    id="Checkbox_Off"
    data-name="Checkbox Off"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="checkbox-svg"
  >
    <rect id="Bounds" width="24" height="24" fill="none" />
    <path
      id="Icon"
      d="M19,5V19H5V5Zm0-2H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5a2.006,2.006,0,0,0-2-2Z"
      fill="#a7a7a7"
      opacity="0.54"
    />
  </svg>
);

const checkboxAllOn = (
  <img
    src={checkbox3}
    className="checkbox-svg checkbox-all-on checkbox-active"
    alt=""
  />
);
const checkboxOn = (
  //<img src={checkbox2} className="checkbox-svg checkbox-active" alt="" />
  <svg
    id="Checkbox_On"
    className="checkbox-svg checkbox-active"
    data-name="Checkbox On"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <rect id="Bounds" width="24" height="24" fill="none" />
    <path
      id="Icon"
      d="M19,3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5a2.006,2.006,0,0,0-2-2ZM10,17,5,12.2l1.4-1.3L10,14.4,17.6,7,19,8.3,10,17Z"
      fill="#6565c4"
    />
  </svg>
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
      <div>
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
    if (this.state.dropdownClicked) {
      this.setState({dropdownClicked: false});
    } else {
      this.setState({dropdownClicked: true, allRemoved: false});
    }
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
      // sets state in parent component.
      this.props.addQuery("selectedGenres", []);
      this.setState({selectAll: false, genresSelected: []});
    } else if (this.state.selectAll === false) {
      this.props.addQuery("selectedGenres", genresList);
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
    this.props.addQuery("selectedGenres", genres);
    this.setState({genresSelected: genres, allRemoved: false});
  };
  removeGenre = ev => {
    const genreCurrent = ev.currentTarget.dataset.genre;
    const genresSelected = this.state.genresSelected.filter(
      genre => genre !== genreCurrent
    );
    this.props.addQuery("selectedGenres", genresSelected);

    if (genresSelected.length === 0) {
      this.setState({allRemoved: true, genresSelected: genresSelected});
    } else {
      this.setState({allRemoved: false, genresSelected: genresSelected});
    }
  };
}

export default CheckboxDropdown;
