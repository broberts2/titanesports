import React from "react";
import Components from "../../components";
import "./card.css";

const config = require("../../../config");

class Card extends React.Component {
  state = {};

  render() {
    return (
      <div className={"card"}>
        <div className={"body"}>
          <img
            src={"http://localhost:7001/img/champion/loading/Aatrox_0.jpg"}
          />
        </div>
      </div>
    );
  }
}

export default Card;
