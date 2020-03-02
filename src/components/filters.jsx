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
  state = {
    screenClicked: false,
    currentInputElement: undefined,

    selectedGenres: [],
    selectionType: "including",
    releaseYearFrom: "",
    releaseYearTo: "",
    reviewScore: 60,
    votes: 2000
  };
  componentDidMount() {}

  componentDidUpdate() {
    this.buildQuery();
  }

  render() {
    //console.log(this.props.screenClicked);

    //console.log(this.props);

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
            addQuery={this.addQuery}
          />
          <RadioButtons addQuery={this.addQuery} />
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
              addQuery={this.addQuery}
            />
            <TextInput
              containerLocation="right"
              inputName="To"
              addDocumentListener={this.addDocumentListener}
              screenClicked={this.state.screenClicked}
              ref={this.inputElement2}
              inputElement="inputElement2"
              addQuery={this.addQuery}
            />
          </div>
        </div>
        <div className="filter-item">
          <Slider
            sliderName="Review Score"
            objectName="reviewScore"
            sliderMin="0"
            sliderMax="100"
            sliderDefault={this.state.reviewScore}
            stepValue="0.01"
            defaultValue={this.state.reviewScore}
            width="60px"
            addQuery={this.addQuery}
          />
        </div>
        <div className="filter-item">
          <Slider
            sliderName="Number of Votes"
            objectName="votes"
            sliderMin="0"
            sliderMax="20000"
            sliderDefault={this.state.votes}
            stepValue="100"
            defaultValue={this.state.votes}
            width="80px"
            addQuery={this.addQuery}
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
  addQuery = (dataName, value) => {
    this.setState({[dataName]: value});
  };

  /**
   * selectedGenres INC = with_genres
   * selectedGenres EXC = without_genres
   * selectedGenres EXA = with_genres + without_genres
   *
   * release_date.gte & release_date.lte
   *
   * vote_average.gte
   *
   * vote_count.gte
   */

  genreQuery = () => {
    // Converts the genre names into an id number that can be used in the API query.
    let selectedGenres = this.state.selectedGenres;

    if (selectedGenres.length > 0) {
      let genreList = this.props.genres.genres;

      let genreNumbers = [];
      let genresNotSelected = [];
      // creates an array of genre id's from the genrelist object
      for (let index = 0; index < genreList.length; index++) {
        genresNotSelected.push(genreList[index].id);
      }
      let count = 0;

      // Iterates through the selectedGenres array looking for matches with the full list of genres.
      for (let i1 = 0; i1 < selectedGenres.length; i1++) {
        for (let i2 = 0; i2 < genreList.length; i2++) {
          if (genreList[i2].name === selectedGenres[i1]) {
            // Creates a new array of selected genres using id numbers instead of genre names.
            genreNumbers.push(genreList[i2].id);
            // removes the genre from genresNotSelected if it find a match. A count is needed because the length of the array decreases by one each time an element is removed.
            genresNotSelected.splice(i2 - count, 1);
            count++;
          }
        }
        let exa = genreList.indexOf();
      }

      // returns a different query depending on the radio button selected

      genreNumbers = genreNumbers.join();
      switch (this.state.selectionType) {
        case "including":
          let inc = `&with_genres=${genreNumbers}`;

          return inc;
        case "excluding":
          let exc = `&without_genres=${genreNumbers}`;

          return exc;
        case "exactly":
          let exa = `&with_genres=${genreNumbers}&without_genres=${genresNotSelected}`;

          return exa;
        default:
      }
    }
    return "";
  };

  releaseYearQuery = () => {
    let from = this.state.releaseYearFrom;
    let to = this.state.releaseYearTo;

    if (from != "" && to != "") {
      return `&primary_release_date.gte=${from}-01-01&primary_release_date.lte=${to}-12-31`;
    }

    if (to != "") {
      return `&primary_release_date.lte=${to}-12-31`;
    }
    if (from != "") {
      return `&primary_release_date.gte=${from}-01-01`;
    }
    return "";
  };

  reviewScoreQuery = () => {
    let reviewScore = this.state.reviewScore;
    if (reviewScore != undefined) {
      return `&vote_average.gte=${reviewScore / 10}`;
    }
    return "";
  };
  voteCountQuery = () => {
    let votes = this.state.votes;
    if (votes != undefined) {
      return `&vote_count.gte=${votes}`;
    }
    return "";
  };

  buildQuery = () => {
    if (this.props.suggestClicked) {
      let genreString = `${this.genreQuery() +
        this.reviewScoreQuery() +
        this.voteCountQuery() +
        this.releaseYearQuery()}`;
      this.props.sendQueryString(genreString);
    }
  };
}

export default Filters;
