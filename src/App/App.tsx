import React from "react";
import "./App.css";
import Folder from "../folderComponent/createFolder";

const App = () => {
  // localStorage.clear();
  return (
    <div>
      <h1 className="App">Image Gallery With React...</h1>
      <Folder />
    </div>
  );
};

export default App;
