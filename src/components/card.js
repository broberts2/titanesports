import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <center>
        <div className={"card"} onClick={() => this.props.cb()}>
          <div className={"image"}>
            <div className={`fas ${this.props.img} fa-8x`} />
          </div>
          {this.props.children}
        </div>
      </center>
    );
  }
}

export default Card;
