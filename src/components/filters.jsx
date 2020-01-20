import React, {Component} from "react";
import CheckboxDropdown from "./checkboxDropdown";
import TextInput from "./textInput";
import Dropdown from "./dropdown";
import RadioButtons from "./radioButtons";
import Slider from "./slider";

class Filters extends Component {
  constructor(props) {
    super(props);

    this.inputElement1 = React.createRef();
    this.inputElement2 = React.createRef();
    this.inputElement3 = React.createRef();
  }
  state = {screenClicked: false, currentInputElement: undefined};
  componentDidMount() {}

  render() {
    //console.log(this.props.screenClicked);

    // Assigns classes for animations if the filter button has been clicked (menuIsActive)
    let filterClass = "filter-menu";

    if (this.props.menuIsActive) {
      filterClass += " menu-active";
    } else {
      filterClass += " menu-closing";
    }

    return (
      <div className={filterClass}>
        <div className="filter-item">
          <h3>GENRES</h3>
          <CheckboxDropdown
            cssClass="genre-included"
            genres={this.props.genres}
          />
          <RadioButtons />
        </div>
        <div className="filter-item">
          <h3>RELEASE YEAR</h3>
          <div className="text-input-grid">
            <TextInput
              containerLocation="left"
              inputName="From"
              addDocumentListener={this.addDocumentListener}
              screenClicked={this.state.screenClicked}
              ref={this.inputElement1}
              inputElement="inputElement1"
            />
            <TextInput
              containerLocation="right"
              inputName="To"
              addDocumentListener={this.addDocumentListener}
              screenClicked={this.state.screenClicked}
              ref={this.inputElement2}
              inputElement="inputElement2"
            />
          </div>
        </div>
        <div className="filter-item">
          <Slider
            sliderName="Review Score"
            sliderMin="0"
            sliderMax="100"
            sliderDefault="70"
            stepValue="0.01"
            defaultValue="70"
            width="60px"
          />
        </div>
        <div className="filter-item">
          <Slider
            sliderName="Number of Votes"
            sliderMin="0"
            sliderMax="20000"
            sliderDefault="70"
            stepValue="100"
            defaultValue="5000"
            width="80px"
          />
        </div>
      </div>
    );
  }
  // Creates an onMousedown listener to the document. This is sent through props to the
  /**
   * This event listener is used to detect when a user clicks on the screen to close a dropdown or text input.
   * It is passed to the dropdown and text input child components where it will be run upon opening a
   * dropdown/text input.
   */
  addDocumentListener = inputElement => {
    document.addEventListener("mousedown", this.handleClickContainer);

    this.setState({screenClicked: false, currentInputElement: inputElement});
    // set state current ref
  };

  /**
   * handClickContain is run when an area outside of the input component is clicked. It runs outsideClick()
   * which is a function in each of the components that tells the state that it is no longer active. This
   * triggers the closing animations for the component.
   */

  handleClickContainer = e => {
    document.removeEventListener("mousedown", this.handleClickContainer);
    let inputElement = this.state.currentInputElement;
    new Function(this[inputElement].current.outsideClick());
    this.setState({screenClicked: true});
  };
}

export default Filters;
