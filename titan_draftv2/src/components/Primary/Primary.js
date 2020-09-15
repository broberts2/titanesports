import React from "react";
import styled from "styled-components";
import Header from "./Header/Header";
import Timer from "./Timer/Timer";
import Grid from "./Grid/Grid";
import _Background from "./Background/Background";

const Primary = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export default class _ extends React.Component {
  render() {
    return (
      <Primary>
        <_Background STATE={this.props.STATE} />
        <Header STATE={this.props.STATE} />
        <Timer STATE={this.props.STATE} />
        <Grid STATE={this.props.STATE} />
      </Primary>
    );
  }
}
