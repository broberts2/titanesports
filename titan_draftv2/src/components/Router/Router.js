import React from "react";
import styled from "styled-components";
import Primary from "../Primary/Primary";

const Router = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  backtround-color: blue;
`;

export default class _ extends React.Component {
  render() {
    return (
      <Router>
        <Primary STATE={this.props.STATE} />
      </Router>
    );
  }
}
