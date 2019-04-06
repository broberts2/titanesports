import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <center>
        <div className={"card"} onClick={() => this.props.cb()}>
          <img src={this.props.img} />
          {this.props.children}
        </div>
      </center>
    );
  }
}

export default Card;
