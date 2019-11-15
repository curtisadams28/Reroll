import React, { Component } from "react";

class Scorebar extends Component {
  render() {
    return (
      <div>
        <p className="title">Review Score</p>
        <div className="bar-container">
          <div className="bar-dark"></div>
          <div
            className="bar-light"
            style={{ width: this.calculateBarWidth() + "vw" }}
          >
            <p className="score">{this.props.score}</p>
          </div>
        </div>
      </div>
    );
  }
  calculateBarWidth = () => {
    const score = this.props.score / 10;
    const barlength = score * 40;
    const request = "width: " + barlength + "vw";
    return barlength;
  };
}

export default Scorebar;
