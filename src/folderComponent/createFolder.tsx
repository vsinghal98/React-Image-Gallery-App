import React from "react";
import Images from "../imageComponent/uploadImage";
import "./createFolder.css";

interface FolderInstnce {
  name: string;
  content: {
    type: string;
    images: string[];
  };
}

interface FolderState {
  input: string;
  folders: FolderInstnce[];
  currentFolderName: string;
}

interface FolderProps {}

const FOLDER_KEY: string = "FOLDER_STATE";

export default class Folder extends React.Component<FolderProps, FolderState> {
  constructor(props: FolderProps) {
    super(props);
    const currentStateString = localStorage.getItem(FOLDER_KEY);
    let currentState: FolderState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      this.state = {
        // folderCount : currentState.folderCount,
        input: currentState.input,
        folders: currentState.folders,
        currentFolderName: currentState.currentFolderName
      };
    } else {
      this.state = {
        // folderCount: -1,
        input: "",
        folders: [{ name: "other images", content: { type: "", images: [] } }],
        currentFolderName: ""
      };
      localStorage.setItem(FOLDER_KEY, JSON.stringify(this.state));
    }
  }

  deleteFolder = (folderName: string) => {
    const currentStateString = localStorage.getItem(FOLDER_KEY);
    let currentState: FolderState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      let names = currentState.folders.map(folder => {
        return folder.name;
      });
      let index = names.indexOf(folderName);
      console.log(index);
      const foldersCopy = [...currentState.folders];
      foldersCopy.splice(index, 1);
      currentState.currentFolderName = "";
      currentState.folders = foldersCopy;
      localStorage.setItem(FOLDER_KEY, JSON.stringify(currentState));
      this.setState(() => {
        return {
          currentFolderName: "",
          folders: foldersCopy
        };
      });
    }
  };
  makeNewFolder = () => {
    const currentStateString = localStorage.getItem(FOLDER_KEY);
    let currentState: FolderState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      let foldersCopy = [...currentState.folders];
      if (currentState.input !== "") {
        foldersCopy.push({
          name: currentState.input,
          content: {
            type: "",
            images: []
          }
        });
        currentState.folders = foldersCopy;
        localStorage.setItem(FOLDER_KEY, JSON.stringify(currentState));
        this.setState(() => {
          return {
            // folderCount: newFolderCount,
            folders: foldersCopy
          };
        });
      }
    }
  };

  displayLeftSideDiv = () => {
    return (
      <div className="b">
        <Images
          inputImages={this.state.folders[0].content.images}
          goBack={() => null}
          folderName={this.state.folders[0].name}
          deleteFolder={() => null}
        />
      </div>
    );
  };

  displayRightSideDiv = () => {
    return (
      <div className="a">
        <div className="displayFolder">
          <input
            className="inputArea"
            type="text"
            placeholder="New Folder Name..."
            onChange={input => this.getInput(input)}
          ></input>
          <button
            className="createFolderButton"
            onClick={() => this.makeNewFolder()}
          >
            {"Create Folder"}
          </button>
        </div>
        <div className="folderArea">{this.showAllFolders()}</div>
      </div>
    );
  };

  showAllFolders = () => {
    const currentStateString = localStorage.getItem(FOLDER_KEY);
    let currentState: FolderState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      const goToFolder = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        const name = e.currentTarget.textContent as string;
        currentState.currentFolderName = name;
        localStorage.setItem(FOLDER_KEY, JSON.stringify(currentState));
        this.setState(() => {
          return {
            currentFolderName: name
          };
        });
      };
      let folderName = this.state.folders.map(folder => {
        return folder.name;
      });
      return folderName.map(
        foldr =>
          !(foldr === "other images") && (
            <button className="Folderss" onClick={goToFolder}>
              {foldr}
            </button>
          )
      );
    }
  };

  getInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const currentStateString = localStorage.getItem(FOLDER_KEY);
    let currentState: FolderState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      const inputt = input.currentTarget.value;
      currentState.input = inputt;
      localStorage.setItem(FOLDER_KEY, JSON.stringify(currentState));
      this.setState(() => {
        return {
          input: inputt
        };
      });
    }
  };

  goBack = () => {
    const currentStateString = localStorage.getItem(FOLDER_KEY);
    let currentState: FolderState;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      currentState.currentFolderName = "";
      localStorage.setItem(FOLDER_KEY, JSON.stringify(currentState));
      this.setState(() => {
        return {
          currentFolderName: ""
        };
      });
    }
  };

  render() {
    const currentStateString = localStorage.getItem(FOLDER_KEY);
    let currentState: FolderState;
    console.log(currentStateString);
    let currentFolder: FolderInstnce | undefined = undefined;
    if (currentStateString) {
      currentState = JSON.parse(currentStateString);
      if (currentState.currentFolderName) {
        currentFolder = currentState.folders.find(folder => {
          return folder.name === currentState.currentFolderName;
        });
      }
    }

    return (
      <div>
        <div>
          {currentFolder ? (
            <Images
              inputImages={currentFolder.content.images}
              goBack={() => this.goBack()}
              folderName={currentFolder.name}
              deleteFolder={this.deleteFolder}
            />
          ) : (
            <div className="GalleryDisplay">
              {this.displayLeftSideDiv()}
              {this.displayRightSideDiv()}
            </div>
          )}
        </div>
      </div>
    );
  }
}
