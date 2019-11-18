import React, { Component } from "react";
class Title extends Component {
  constructor(props) {
    super(props);
    this.titleLength = React.createRef();
  }
  componentDidMount() {
    console.log(this.titleLength.current.clientWidth);
  }
  render() {
    return (
      <div>
        <p className="genres">{this.createGenre()}</p>
        <div className="title-container">
          <h2 ref={this.titleLength} className="movie-title">
            {this.props.title}
          </h2>
        </div>
      </div>
    );
  }
  createGenre = () => {
    const genres = this.props.genre;

    if (genres === undefined) {
      return;
    } else {
      let text = "";

      for (let index = 0; index < genres.length; index++) {
        if (index === genres.length - 1) {
          text = text + genres[index].name;
          break;
        }
        text = text + genres[index].name + " - ";
      }
      return text;
    }
  };
}

export default Title;
