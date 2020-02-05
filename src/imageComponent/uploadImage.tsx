import React from "react";
import "../App/App.css";
import "./uploadImage.css";
import Search from "../searchComponent/imageSearch";

interface ImageState {
  images: string[];
  currentImageIndex: number;
  searchFlag: string;
}

interface ImageProps {
  inputImages: string[];
  goBack: () => void;
  folderName: string;
  deleteFolder: (folderName: string) => void;
}

export default class Images extends React.Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      currentState.images = this.props.inputImages;
      this.state = {
        images: currentState.images,
        currentImageIndex: currentState.currentImageIndex,
        searchFlag: currentState.searchFlag
      };
    } else {
      this.state = {
        images: this.props.inputImages,
        currentImageIndex: 0,
        searchFlag: ""
      };
      localStorage.setItem(this.props.folderName, JSON.stringify(this.state));
    }
  }

  getImage = () => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      const curImage =
        currentState.currentImageIndex >= 0
          ? currentState.images[currentState.currentImageIndex]
          : null;
      if (currentState.images.length > 0) {
        return (
          <img
            src={require(`../pic/${curImage}`)}
            alt={`${currentState.currentImageIndex}`}
          />
        );
      } else {
        return <img src={require("../pic/no-image.jpg")} alt={"error"} />;
      }
    }
  };
  getPrev = () => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      let imageIndexCopy = currentState.currentImageIndex;
      imageIndexCopy = imageIndexCopy > 0 ? imageIndexCopy - 1 : 0;
      currentState.currentImageIndex = imageIndexCopy;
      localStorage.setItem(this.props.folderName, JSON.stringify(currentState));
      this.setState(() => {
        return {
          currentImageIndex: imageIndexCopy
        };
      });
    }
  };

  getNext = () => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      let imageIndexCopy = currentState.currentImageIndex;
      imageIndexCopy =
        imageIndexCopy < currentState.images.length - 1
          ? imageIndexCopy + 1
          : imageIndexCopy;
      currentState.currentImageIndex = imageIndexCopy;
      localStorage.setItem(this.props.folderName, JSON.stringify(currentState));
      this.setState(() => {
        return {
          currentImageIndex: imageIndexCopy
        };
      });
    }
  };

  deleteImage = () => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      let imagesCopy = [...currentState.images];
      if (imagesCopy.length > 0)
        imagesCopy.splice(currentState.currentImageIndex, 1);
      currentState.images = imagesCopy;
      currentState.currentImageIndex = 0;
      localStorage.setItem(this.props.folderName, JSON.stringify(currentState));
      this.setState(() => {
        return { images: imagesCopy, currentImageIndex: 0 };
      });
    }
  };

  displayPrev = () => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      if (currentState.images.length > 1) {
        return (
          <button className="prev" onClick={this.getPrev}>
            {"<"}
          </button>
        );
      }
    }
  };

  displayDelete = () => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      if (currentState.images.length > 0) {
        return (
          <button className="deleteButton" onClick={() => this.deleteImage()}>
            {"Delete"}
          </button>
        );
      }
    }
  };
  displayNext = () => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      if (currentState.images.length > 1) {
        return (
          <button className="next" onClick={() => this.getNext()}>
            {">"}
          </button>
        );
      }
    }
  };

  displaySearch = () => {
    return (
      <Search
        myImages={this.state.images}
        componentToggler={value =>
          this.setState(() => {
            return {
              searchFlag: value
            };
          })
        }
      />
    );
  };

  displayBackAndDelete = () => {
    return (
      <div>
        <button className="backButton" onClick={() => this.props.goBack()}>
          {"back"}
        </button>
        <button
          className="deleteFolderButton"
          onClick={() => this.props.deleteFolder(this.props.folderName)}
        >
          {"Delete Folder"}
        </button>
      </div>
    );
  };
  getImageUploader = () => {
    return (
      <div className="imageUpload">
        <p>Upload Image :</p>
        <input
          className="inputWrapper"
          type="file"
          accept="image/png, .jpeg, .jpg, image/gif"
          onChange={input => this.getInput(input)}
        />
      </div>
    );
  };
  getInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const currentStateString = localStorage.getItem(this.props.folderName);
    let currentState: ImageState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      let name = input.target.files && input.target.files[0]?.name;
      if (name) {
        let imagesCopy = [...currentState.images];
        imagesCopy.push(name);
        currentState.images = imagesCopy;
        localStorage.setItem(
          this.props.folderName,
          JSON.stringify(currentState)
        );
        this.setState(() => {
          return {
            images: imagesCopy
          };
        });
      }
    }
  };

  render() {
    const searchItem = this.state.searchFlag;
    return (
      <header>
        {!(this.props.folderName === "other images") && (
          <h1 className="folderName">Folder : {this.props.folderName}</h1>
        )}
        <div className="displaySearch">{this.displaySearch()}</div>
        {!searchItem && (
          <div className="ImagePage">
            <div className="imageWrapper">
              {!(this.props.folderName === "other images") && (
                <>{this.displayBackAndDelete()}</>
              )}
              <div className="ImageDiv">
                <div className="displayImage">{this.getImage()}</div>
                {this.displayNext()}
                {this.displayPrev()}
              </div>
              {this.state.images.length !== 0 && (
                <div>
                  <p>
                    image : [ {this.state.currentImageIndex + 1} /
                    {this.state.images.length} ]
                  </p>
                </div>
              )}
              <div>{this.displayDelete()}</div>
            </div>
            {this.getImageUploader()}
          </div>
        )}
      </header>
    );
  }
}
