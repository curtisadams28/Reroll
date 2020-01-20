import React, {Component} from "react";
class RadioButtons extends Component {
  state = {selected: "including"};
  render() {
    console.log(this.state.selected);
    return (
      <div className="radio-button-grid">
        <span
          className="radio-button-left radio-container"
          onClick={this.handleClick}
          name="including"
        >
          <div className="radio-button">
            <div
              className={`radio-button-inner ${this.radioChecked("including")}`}
            ></div>
          </div>

          <p className="radio-label">Including</p>
          <div className="checkmark"></div>
        </span>
        <span
          className="radio-button-centre radio-container"
          onClick={this.handleClick}
          name="excluding"
        >
          <div className="radio-button">
            <div
              className={`radio-button-inner ${this.radioChecked("excluding")}`}
            ></div>
          </div>

          <p className="radio-label">Excluding</p>
        </span>
        <span
          className="radio-button-right radio-container"
          onClick={this.handleClick}
          name="exactly"
        >
          <div className="radio-button">
            <div
              className={`radio-button-inner ${this.radioChecked("exactly")}`}
            ></div>
          </div>

          <p className="radio-label">Exactly</p>
        </span>
      </div>
    );
  }
  // Handles the onClick event and gets the name of the radio button clicked.
  handleClick = e => {
    e.stopPropagation();
    this.setState({selected: e.currentTarget.getAttribute("name")});
  };
  // returns an additional class for the radio button that is clicked for animations.
  radioChecked = type => {
    if (type === this.state.selected) {
      return "radio-checked";
    }
  };
}

export default RadioButtons;
