import React from "react";
import "./imageSearch.css";

interface searchState {
  searchedImages: string[];
  searchItem: string;
}

interface searchprops {
  myImages: string[];
  componentToggler: (val: string) => void;
}

const SEARCH_KEY = "SEARCH_KEY";

export default class Search extends React.Component<searchprops, searchState> {
  constructor(props: searchprops) {
    super(props);
    const currentStateString = localStorage.getItem(SEARCH_KEY);
    let currentState: searchState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      this.state = {
        searchedImages: currentState.searchedImages,
        searchItem: currentState.searchItem
      };
    } else {
      this.state = {
        searchedImages: [],
        searchItem: ""
      };
      localStorage.setItem(SEARCH_KEY, JSON.stringify(this.state));
    }
  }

  performAction(input: React.ChangeEvent<HTMLInputElement>) {
    const currentStateString = localStorage.getItem(SEARCH_KEY);
    let currentState: searchState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      const inputValue = input.currentTarget.value;
      this.props.componentToggler(inputValue);
      let searchedImages = this.props.myImages.filter(images =>
        images.startsWith(inputValue)
      );
      currentState.searchedImages = searchedImages;
      currentState.searchItem = inputValue;
      localStorage.setItem(SEARCH_KEY, JSON.stringify(currentState));
      this.setState(() => {
        return {
          searchItem: inputValue,
          searchedImages: searchedImages
        };
      });
    }
  }

  showImages() {
    const { searchedImages } = this.state;
    if (searchedImages.length && this.state.searchItem) {
      return searchedImages.map(image => (
        <img
          className="ImageWrapper"
          src={require(`../pic/${image}`)}
          alt={`${image}`}
        />
      ));
    }
    if (!searchedImages.length && this.state.searchItem) {
      return <img src={require("../pic/no-image.jpg")} alt={"No images"} />;
    }
  }

  render() {
    return (
      <div>
        <div>
          <input
            className="search"
            onChange={input => this.performAction(input)}
            type="text"
            placeholder="Search Images..."
          ></input>
        </div>
        <div className="searchContent">{this.showImages()}</div>
      </div>
    );
  }
}
