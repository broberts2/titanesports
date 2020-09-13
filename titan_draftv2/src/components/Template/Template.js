import React from "react";
import styled, { ThemeProvider } from "styled-components";

const Template = styled.div``;

export default class _ extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{}}>
        <Template>Template</Template>
      </ThemeProvider>
    );
  }
}
