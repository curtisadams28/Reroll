import React, {Component} from "react";
import arrow from "../img/arrow.svg";
import {CSSTransition} from "react-transition-group";
import cancel from "../img/cancel.svg";
class Dropdown extends Component {
  state = {
    dropdownClicked: false,
    selectedOption: undefined,
    optionRemoved: false
  };

  render() {
    return (
      <div className="dropdown-grid-column">
        <div
          className="dropdown-box"
          onClick={this.dropdownClick}
          style={this.props.styles}
        >
          <p className={`dropdown-name ${this.dropdownStateClasses()}`}>
            {this.props.dropdownName}
          </p>
          <p className="dropdown-selected-genres">
            {this.state.selectedOption}
          </p>
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
        <CSSTransition
          in={this.state.dropdownClicked}
          appear={this.state.dropdownClicked}
          timeout={250}
          classNames="slide"
          unmountOnExit
        >
          <div
            className="options-container simple-options-container"
            style={this.props.dropdownWidth}
          >
            <div className="simple-dropdown-options">{this.createList()}</div>
          </div>
        </CSSTransition>
      </div>
    );
  }

  dropdownClick = () => {
    if (this.state.dropdownClicked === true) {
      this.setState({dropdownClicked: false});
    } else {
      this.setState({dropdownClicked: true});
    }
  };

  createList = () => {
    let element = this.props.selectData.map(data => (
      <div data-selected={data} onClick={this.handleOptions} key={data}>
        {data}
        {data === this.state.selectedOption ? (
          <div className="close" onClick={this.removeSelectedOption}>
            <img
              className="dropdown-close-button"
              src={require("../img/cancel.svg")}
            ></img>
          </div>
        ) : (
          ""
        )}
      </div>
    ));
    return element;
  };
  removeSelectedOption = e => {
    e.stopPropagation();
    this.setState({selectedOption: undefined, optionRemoved: true});
  };

  /*
  deleteButton = () => {
    if (data === this.state.selectedOption) {
      console.log("hello");

      return (
        <div>
          
          <p>hello</p>
        </div>
      );
    }
  };
*/
  handleOptions = ev => {
    this.setState({selectedOption: ev.currentTarget.dataset.selected});
  };

  dropdownStateClasses = () => {
    const clicked = this.state.dropdownClicked;
    const selectedOption = this.state.selectedOption;
    if (clicked === true && this.state.optionRemoved === true) {
      return "dropdown-selected-on";
    }
    if (clicked === true && selectedOption === undefined) {
      //console.log("No Selection ON");
      return "dropdown-on";
    } else if (clicked === false && selectedOption === undefined) {
      //console.log("No Selection OFF");
      return "dropdown-off";
    } else if (clicked === true) {
      //console.log("Selected ON");
      return "dropdown-selected-on";
    } else if (clicked === false) {
      // console.log("Selected OFF");
      return "dropdown-selected-off";
    }
  };
}

export default Dropdown;
