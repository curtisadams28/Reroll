import React, {Component} from "react";
class Slider extends Component {
  state = {value: 70};
  componentWillMount() {
    this.setState({value: this.props.defaultValue});
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
          <p className="slider-numbers-text">
            {Math.ceil(this.state.value) + "+"}
          </p>
        </div>

        <div className="slidercontainer">
          <input
            type="range"
            min={this.props.sliderMin}
            max={this.props.sliderMax}
            onChange={this.handleSliderChange}
            className="slider"
            id="myRange"
            step={this.props.stepValue}
            value={this.state.value}
          ></input>
        </div>
      </div>
    );
  }
  handleSliderChange = e => {
    console.log(e.target.value);

    this.setState({value: e.target.value});
  };
  handleTextChange = e => {
    let value = e.target.value;
    if (value === "") {
      value = 1;
    }
    //value.substring(0, value.length - 1);
    console.log(value);
    this.setState({value: value});
  };
}

export default Slider;
