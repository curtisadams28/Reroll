import React, {Component} from "react";
class TextInput extends Component {
  state = {value: ""};

  render() {
    return (
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
        />
        <div
          className={`underline-text dropdown-underline dropdown-underline${
            this.state.dropdownClicked ? "-clicked" : "-not-clicked"
          }`}
        ></div>

        {this.inputValidation()}
      </div>
    );
  }
  handleChange = event => {
    this.setState({value: event.target.value});
  };
  dropdownClick = () => {
    if (this.state.dropdownClicked === true) {
      this.setState({dropdownClicked: false});
    } else {
      this.props.addDocumentListener(this.props.inputElement);

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
    if (isNaN(this.state.value)) {
      console.log("no a number");
      return <p className="error-message">Must be a number eg. 1955</p>;
    }
  };

  outsideClick = () => {
    console.log("outside click triggered");

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

export default TextInput;
