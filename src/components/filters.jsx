import React, {Component} from "react";
import CheckboxDropdown from "./checkboxDropdown";
import TextInput from "./textInput";
import Dropdown from "./dropdown";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
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
      <div ref={this.menuRef} className={filterClass}>
        <CheckboxDropdown
          cssClass="genre-included"
          genres={this.props.genres}
          screenClicked={this.state.screenClicked}
          ref={this.inputElement1}
          inputElement="inputElement1"
          addDocumentListener={this.addDocumentListener}
        />

        <div className="text-input-grid filter-item">
          <TextInput
            containerLocation="left"
            inputName="From"
            addDocumentListener={this.addDocumentListener}
            screenClicked={this.state.screenClicked}
            ref={this.inputElement2}
            inputElement="inputElement2"
          />
          <TextInput
            containerLocation="right"
            inputName="To"
            addDocumentListener={this.addDocumentListener}
            screenClicked={this.state.screenClicked}
            ref={this.inputElement3}
            inputElement="inputElement3"
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
    //console.log(this.inputElement1.current);
    new Function(this[inputElement].current.outsideClick());
    this.setState({screenClicked: true});
  };
}

export default Filters;
