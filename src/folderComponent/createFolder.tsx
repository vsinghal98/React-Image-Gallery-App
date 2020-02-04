import React from "react";
import Images from "../imageComponent/uploadImage";
import "./createFolder.css";

interface FolderInstnce {
  Name: string;
  content: {
    type: string;
    images: string[];
  };
}

interface FolderState {
  folderCount: number;
  input: string;
  folders: FolderInstnce[];
  currentFolderName: string;
}

interface FolderProps {}

export default class Folder extends React.Component<FolderProps, FolderState> {
  constructor(props: FolderProps) {
    super(props);
    this.state = {
      folderCount: -1,
      input: "",
      folders: [{ Name: "other images", content: { type: "", images: [] } }],
      currentFolderName: ""
    };
  }

  deleteFolder = (folderName: string) => {
    const { folders } = this.state;
    let names = folders.map(folder => {
      return folder.Name;
    });

    let index = names.indexOf(folderName);
    //review
    const vvv = [...folders]
    vvv.splice(index, 1);
    this.setState(()=>{return {
      currentFolderName: "",
      folders: vvv
    }});
  };
  makeNewFolder = () => {
    const { input, folderCount, folders } = this.state;
    let nextFolder = folderCount;
    let FolderCp = folders;
    if (input !== "") {
      FolderCp.push({
        Name: input,
        content: {
          type: "",
          images: []
        }
      });
      nextFolder++;
    }
    this.setState(()=>{return {
      folderCount: nextFolder,
      folders: FolderCp,
      input: ""
    }});
  };

  showAllFolders = () => {
    const goToFolder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const name = e.currentTarget.textContent as string;
      this.setState(()=>{return {
        currentFolderName: name
      }});
    };
    const { folders } = this.state;
    let folderName = folders.map(folder => {
      return folder.Name;
    });
    return folderName.map(
      foldr =>
        !(foldr === "other images") && (
          <button className="Folderss" onClick={goToFolder}>
            {foldr}
          </button>
        )
    );
  };

  getInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const inputt = input.currentTarget.value;
    this.setState(()=>{return {
      input: inputt
    }});
  };

  render() {
    let currentFolder: FolderInstnce | undefined = undefined;
    if (this.state.currentFolderName) {
      currentFolder = this.state.folders.find(folder => {
        return folder.Name === this.state.currentFolderName;
      });
    }
    return (
      <div>
        <div>
          {currentFolder ? (
            <Images
              inputImages={currentFolder.content.images}
              goBack={() =>
                this.setState(()=>{return {
                  currentFolderName: ""
                }})
              }
              folderName={currentFolder.Name}
              deleteFolder={this.deleteFolder}
            />
          ) : (
            <div className="GalleryDisplay">
              <div className="b">
                <Images
                  inputImages={this.state.folders[0].content.images}
                  goBack={() => null}
                  folderName={this.state.folders[0].Name}
                  deleteFolder={() => null}
                />
              </div>
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
            </div>
          )}
        </div>
      </div>
    );
  }
}
