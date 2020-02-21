import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";
class Background extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.backgroundObj = React.createRef();
  }
  state = {
    oldBackground: "",
    img1: "",
    img2: "",
    imageLoaded: null,
    backgroundChange: false,
    backgroundFadeOut: "background-fade-out",
    backgroundFadeIn: "background-fade-in"
  };
  componentDidUpdate() {}

  componentDidMount() {}

  // static getDerivedStateFromProps(background, state)
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.background != state.oldBackground) {
      //console.log("run animation");
      //console.log(nextProps.background, state.oldBackground);

      return {
        img1: nextProps.background,
        img2: state.oldBackground,
        oldBackground: nextProps.background,
        backgroundChange: true
      };
    } else {
      return null;
    }
  }
  render() {
    /*
    console.log(
      "old background: " + this.state.oldBackground.background,
      "new background" + this.props.background
    );
    */

    return <div>{this.background()}</div>;
  }
  background = () => {
    if (this.state.backgroundChange) {
      //console.log(this.state.imageLoaded);

      return (
        <div>
          <img
            className={`background ${this.state.backgroundFadeIn}`}
            onLoad={this.imageLoaded}
            src={this.state.img1}
          ></img>

          <img
            className={`background ${this.state.backgroundFadeOut}`}
            src={this.state.img2}
            ref={this.backgroundObj}
          ></img>
        </div>
      );
    } else {
      return (
        <div>
          <img className={`background b1`} src={this.state.img1}></img>
          <img className="background b2" src={this.state.img2}></img>
        </div>
      );
    }
  };
  /**
   * Creates the classes for the crossfade animations. There needs to be two sepereate classes so that
   * the animations can be triggered more than once by swapping between the two.
   */
  imageLoaded = () => {
    if (this.state.backgroundFadeOut === "background-fade-out") {
      this.setState({backgroundFadeOut: "background-fade-out-2"});
    } else {
      this.setState({backgroundFadeOut: "background-fade-out"});
    }
    if (this.state.backgroundFadeIn === "background-fade-in") {
      this.setState({backgroundFadeIn: "background-fade-in-2"});
    } else {
      this.setState({backgroundFadeIn: "background-fade-in"});
    }
  };
  backgroundClass = () => {
    if (this.state.backgroundFadeOut) {
    }
    return "hi";
  };
}

export default Background;
