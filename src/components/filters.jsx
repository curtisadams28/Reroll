import React, { Component } from "react";
import CheckboxDropdown from "./checkboxDropdown";
class Filters extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }
  componentDidMount() {}

  render() {
    // Assigns classes for animations if the filter button has been clicked (menuIsActive)
    let filterClass = "filter-menu";

    if (this.props.menuIsActive) {
      filterClass += " menu-active";
    } else {
      filterClass += " menu-closing";
    }

    return (
      <div ref={this.menuRef} className={filterClass}>
        <CheckboxDropdown
          cssClass="genre-included"
          genres={this.props.genres}
        />
      </div>
    );
  }
}

export default Filters;
