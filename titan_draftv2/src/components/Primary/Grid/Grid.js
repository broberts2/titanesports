import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Grid, Button } from "arclight-react";
import Card from "../Card/Card";

const _Grid = styled.div`
  margin: 25px;
  position: absolute;
  top: 60%;
  transform: translateY(-60%);
`;

export default class _ extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{}}>
        <_Grid>
          <table width={"100%"}>
            <tbody>
              <tr>
                <td>
                  <Grid
                    theme={"Dark"}
                    itemsPerRow={5}
                    items={[<Card />, <Card />, <Card />, <Card />, <Card />]}
                  />
                </td>
                <td width={"5%"} />
                <td>
                  <Grid
                    theme={"Dark"}
                    itemsPerRow={5}
                    items={[<Card />, <Card />, <Card />, <Card />, <Card />]}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table width={"100%"}>
            <tbody>
              <tr>
                <td>
                  <Grid
                    theme={"Dark"}
                    itemsPerRow={5}
                    items={[<Card />, <Card />, <Card />, <Card />, <Card />]}
                  />
                </td>
                <td width={"35%"} align={"center"}>
                  <Button
                    trans={{ animation: "pulse", count: "infinite" }}
                    theme={"Light"}
                    pop
                    onClick={() => this.props.STATE.setModalStatus(true)}
                  >
                    Champion Select
                  </Button>
                </td>
                <td>
                  <Grid
                    theme={"Dark"}
                    itemsPerRow={5}
                    items={[<Card />, <Card />, <Card />, <Card />, <Card />]}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </_Grid>
      </ThemeProvider>
    );
  }
}
