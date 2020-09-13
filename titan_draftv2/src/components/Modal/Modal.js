import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Modal, Particles, Timer, Grid } from "arclight-react";

const _Title = styled.div`
  margin-top: 15px;
  & table {
    border-spacing: 20px 0;
  }
`;

export default class _ extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{}}>
        <Modal
          theme={"Dark"}
          visible={this.props.STATE.modalVisible}
          disableClickAway
          title={
            <_Title>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Timer
                        theme={this.props.STATE.config.THEME}
                        isPlaying={false}
                        size={75}
                        seconds={60}
                        crit={7}
                        strokeWidth={3}
                        onComplete={() => console.log("Timer Finished")}
                      />
                    </td>
                    <td>
                      <h1>
                        <b>
                          <i>Ban Phase</i>
                        </b>
                      </h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </_Title>
          }
          crown={{
            position: "right",
            constrain: false,
            content: (
              <div>
                <img src={require("../../config/assets/spirit-flower.png")} />
                <div style={{ position: "absolute", top: -55, left: -55 }}>
                  <Particles
                    width={300}
                    height={300}
                    animations={[
                      {
                        name: "spiritual",
                        particleColor: "#00fff0",
                        x: 50,
                        y: 50,
                      },
                    ]}
                    invoke={false}
                  />
                </div>
              </div>
            ),
          }}
          setVisible={(a) => this.props.STATE.setModalStatus(a)}
        >
          <h1>Shalom</h1>
        </Modal>
      </ThemeProvider>
    );
  }
}
