import React, {Component} from "react";
import PropTypes from "prop-types";
class TextInput extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  state = {value: "", valueOver: false, error: ""};

  render() {
    return (
      <div ref={this.setWrapperRef}>
        {this.props.children}
        <div
          className={`dropdown-box text-input-container ${"container-" +
            this.props.containerLocation}`}
        >
          <label className={`dropdown-name ${this.dropdownStateClasses()}`}>
            {this.props.inputName}
          </label>
          <input
            className="text-input-box"
            id={this.props.dropdownName}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onClick={this.dropdownClick}
            maxLength="4"
          />
          <div
            className={`underline-text dropdown-underline dropdown-underline${
              this.state.dropdownClicked ? "-clicked" : "-not-clicked"
            }`}
          ></div>
          {this.inputValidation()}
        </div>
      </div>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.addQuery(
        `releaseYear${this.props.inputName}`,
        this.state.value
      );
      this.setState({dropdownClicked: false});
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  // Updates the state when a text input is detected
  handleChange = event => {
    const value = event.target.value;

    // Simple input validation. The error object is used by inputValidation()
    const currentYear = new Date().getFullYear();
    let error = "none";
    if (isNaN(value)) {
      error = "Must be a number eg. 1955";
    }
    if (value < 0) {
      error = "Year cannot be negative";
    }
    if (value > currentYear) {
      error = `Year cannot go beyond ${currentYear}`;
    }
    console.log(error);
    this.setState({
      value: value,
      error: error
    });
  };
  dropdownClick = () => {
    if (this.state.dropdownClicked === true) {
      //document.removeEventListener("mousedown", this.handleClickOutside);
      //this.setState({dropdownClicked: false});
    } else {
      //this.props.addDocumentListener(this.props.inputElement);
      document.addEventListener("mousedown", this.handleClickOutside);

      this.setState({dropdownClicked: true});
    }
  };
  /**
   * Sets dropdownClicked to false when the user clicks outside of the element.
   * This is triggered in the filters component.
   *
   *
   */
  inputValidation = () => {
    if (this.state.error !== "none") {
      return <p className="error-message">{this.state.error}</p>;
    }
  };

  outsideClick = () => {
    //this.props.addQuery(`releaseYear${this.props.inputName}`, this.state.value);

    this.setState({dropdownClicked: false});
  };
  dropdownStateClasses = () => {
    const clicked = this.state.dropdownClicked;
    const value = this.state.value;

    if (clicked === true && value === "") {
      return "dropdown-on";
    } else if (clicked === false && value === "") {
      return "dropdown-off";
    } else if (clicked === true) {
      return "dropdown-selected-on";
    } else if (clicked === false) {
      return "dropdown-selected-off";
    }
  };
}
/*
TextInput.propTypes = {
  children: PropTypes.element.isRequired
};
*/

export default TextInput;
