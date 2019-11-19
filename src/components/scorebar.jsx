import React, { Component } from "react";

class Scorebar extends Component {
  render() {
    return (
      <div>
        <p className="title review-score">Review Score</p>
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
    /*

    contentWidth = () => {
      if (this.props.window_width < 1300) {
        return 70;
      } else {
        return 50;
      }
    };
    */
    //console.log(this.props.window_width);

    const barlength = score * getViewWidth(this.props);

    function getViewWidth(props) {
      if (props.window_width > 1300) {
        return 50;
      } else {
        return 70;
      }
    }

    return barlength;
  };
}

export default Scorebar;
