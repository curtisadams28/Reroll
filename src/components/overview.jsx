import React, { Component } from "react";
class Overview extends Component {
  render() {
    return (
      <div className="overview">
        <p className="title overview-title">Overview</p>
        <p className="overview-text">{this.props.overview}</p>
      </div>
    );
  }
}

export default Overview;
