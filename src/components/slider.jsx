import React, {Component} from "react";
class Slider extends Component {
  /*
  componentWillMount() {
    this.setState({value: this.props.defaultValue});
  }
  */

  constructor(props) {
    super(props);
    this.state = {value: props.defaultValue};
  }
  render() {
    return (
      <div className="review-score-container">
        <h3>{this.props.sliderName}</h3>
        <div
          className="slider-numbers"
          type="number"
          value={Math.ceil(this.state.value)}
          onChange={this.handleTextChange}
          style={{width: this.props.width}}
        >
          <p className="slider-numbers-text">{this.sliderDisplay()}</p>
        </div>

        <div className="slidercontainer">
          <input
            type="range"
            min={this.props.sliderMin}
            max={this.props.sliderMax}
            onChange={this.handleSliderChange}
            onTouchEnd={this.sendData}
            onMouseUp={this.sendData}
            className="slider"
            id="myRange"
            step={this.props.stepValue}
            value={this.state.value}
          ></input>
        </div>
      </div>
    );
  }

  sliderDisplay = () => {
    if (this.props.objectName === "reviewScore") {
      return Math.round(this.state.value / 10) + "+";
    } else {
      return Math.ceil(this.state.value) + "+";
    }
  };

  handleSliderChange = (e) => {
    this.setState({value: e.target.value});
  };
  handleTextChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      value = 1;
    }
    //value.substring(0, value.length - 1);
    this.setState({value: value});
  };
  sendData = () => {
    this.props.addQuery([this.props.objectName], Math.ceil(this.state.value));
  };
}

export default Slider;
