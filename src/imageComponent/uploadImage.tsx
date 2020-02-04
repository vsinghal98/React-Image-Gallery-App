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
    this.state = {
      images: this.props.inputImages,
      currentImageIndex: 0,
      searchFlag: ""
    };
  }

  getImage = () => {
    const { images, currentImageIndex } = this.state;
    const curImage = currentImageIndex >= 0 ? images[currentImageIndex] : null;
    if (images.length > 0) {
      return (
        <img src={require(`../pic/${curImage}`)} alt={`${currentImageIndex}`} />
      );
    } else {
      return <img src={require("../pic/no-image.jpg")} alt={"error"} />;
    }
  };
  getPrev = () => {
    // const { currentImageIndex } = this.state;
    this.setState(prevState => {
      return {
        currentImageIndex:
          prevState.currentImageIndex > 0 ? prevState.currentImageIndex - 1 : 0
      };
    });
  };

  getNext = () => {
    const { images, currentImageIndex } = this.state;
    this.setState(prevState => {
      return {
        currentImageIndex:
          prevState.currentImageIndex < images.length - 1
            ? prevState.currentImageIndex + 1
            : prevState.currentImageIndex
      };
    });
  };

  deleteImage = () => {
    let { images, currentImageIndex } = this.state;
    if (images.length > 0) images.splice(currentImageIndex, 1);
    this.setState(() => {
      return {
        images: images,
        currentImageIndex: 0
      };
    });
  };

  displayPrev = () => {
    const { images } = this.state;
    if (images.length > 1) {
      return (
        <button className="prev" onClick={this.getPrev}>
          {"<"}
        </button>
      );
    }
  };
  displayDelete = () => {
    const { images } = this.state;
    if (images.length > 0) {
      return (
        <button className="deleteButton" onClick={() => this.deleteImage()}>
          {"Delete"}
        </button>
      );
    }
  };
  displayNext = () => {
    const { images } = this.state;
    if (images.length > 1) {
      return (
        <button className="next" onClick={() => this.getNext()}>
          {">"}
        </button>
      );
    }
  };
  getInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    let name = input.target.files && input.target.files[0]?.name;
    if (name) {
      let { images } = this.state;
      images.push(name);
      this.setState(() => {
        return {
          images: images
        };
      });
    }
  };
  render() {
    const searchItem = this.state.searchFlag;
    console.log(searchItem);
    return (
      <header>
        {!(this.props.folderName === "other images") && (
          <h1 className="folderName">Folder : {this.props.folderName}</h1>
        )}
        <div className="displaySearch">
          <Search
            myImages={this.state.images}
            componentToggler={value =>
              this.setState(()=>{
                return {
                searchFlag: value
              }
            })
            }
          />
        </div>
        {!searchItem && (
          <div className="ImagePage">
            <div className="imageWrapper">
              {!(this.props.folderName === "other images") && (
                <div>
                  <button
                    className="backButton"
                    onClick={() => this.props.goBack()}
                  >
                    {"back"}
                  </button>
                  <button
                    className="deleteFolderButton"
                    onClick={() =>
                      this.props.deleteFolder(this.props.folderName)
                    }
                  >
                    {"Delete Folder"}
                  </button>
                </div>
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
            <div className="imageUpload">
              <p>Upload Image :</p>
              <input
                className="inputWrapper"
                type="file"
                accept="image/png, .jpeg, .jpg, image/gif"
                onChange={input => this.getInput(input)}
              />
            </div>
          </div>
        )}
      </header>
    );
  }
}
