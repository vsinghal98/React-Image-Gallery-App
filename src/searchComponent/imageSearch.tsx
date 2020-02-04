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

export default class Search extends React.Component<searchprops, searchState> {
  constructor(props: searchprops) {
    super(props);
    this.state = {
      searchedImages: [],
      searchItem: ""
    };
  }

  performAction(input: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = input.currentTarget.value;
    this.props.componentToggler(inputValue);
    this.setState(()=>{return{
      searchItem: inputValue
    }});
    let searchedImages = this.props.myImages.filter(images =>
      images.startsWith(inputValue)
    );
    this.setState(()=>{return {
      searchedImages: searchedImages
    }});
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
