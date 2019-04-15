import React, { Component } from "react";
import { SpringSpinner } from "react-epic-spinners";

class Loader extends Component {
  render() {
    return (
      <div className={"loader"}>
        <SpringSpinner color="red" />
      </div>
    );
  }
}

export default Loader;
