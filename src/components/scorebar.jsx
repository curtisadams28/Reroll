import React, {Component} from "react";

class Scorebar extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }
  // Creates an event listener that will call updateDimensions on rezise of the window

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({
      width: window.innerWidth
    });
  };
  render() {
    return (
      <div>
        <p className="title review-score">Review Score</p>
        <div className="bar-container">
          <div className="bar-dark"></div>
          <div
            className="bar-light"
            style={{width: this.calculateBarWidth() + "vw"}}
          >
            <p className="score">{this.props.score}</p>
          </div>
        </div>
      </div>
    );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  // Calculates the width (vw) of the score bar depending on the window width

  calculateBarWidth = () => {
    const score = this.props.score / 10;

    this.contentWidth = () => {
      if (this.state.width < 900) {
        return 80;
      }
      if (this.state.width < 1300) {
        return 70;
      } else {
        return 50;
      }
    };

    const barlength = score * this.contentWidth();

    return barlength;
  };
}

export default Scorebar;
