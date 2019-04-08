import React, { Component } from "react";

class Content extends Component {
  render() {
    return (
      <div className={"content"}>
        <div className={"content-shape"}>
          <img src={this.props.img} />
        </div>
        <div className={"content-children"}>
          <div className={"buffer"} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Content;
