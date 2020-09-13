import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Primary from "../Primary/Primary";

const Router = styled.div``;

export default class _ extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{}}>
        <Router>
          <Primary STATE={this.props.STATE} />
        </Router>
      </ThemeProvider>
    );
  }
}
