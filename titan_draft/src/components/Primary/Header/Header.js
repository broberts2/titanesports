import React from "react";
import styled from "styled-components";
import { Header, Transition, Button, Particles, Modal } from "arclight-react";

const _Header_ = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export default class _ extends React.Component {
  render() {
    return (
      <_Header_>
        <Header
          name={"StylishCenter"}
          textDisplay={{
            left: null,
            center: null,
            right: null,
          }}
          theme={"Dark"}
          info={{
            width: "100%",
            height: "125px",
            crown: (
              <Transition
                trans={this.props.STATE.draftData.HEADER.CROWN_TRANSITION}
                style={{ opacity: 0 }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "75px",
                    height: "75px",
                  }}
                >
                  <img
                    src={
                      this.props.STATE.ENDPOINT +
                      "/" +
                      this.props.STATE.draftData.LOGO
                    }
                    style={{
                      height: "100%",
                    }}
                  />
                  <div style={{ position: "absolute", top: -30, left: -140 }}>
                    <div />
                  </div>
                </div>
              </Transition>
            ),
          }}
          controls={[
            <Transition
              trans={this.props.STATE.draftData.HEADER.RIGHT_TEAM_TRANSITION}
            >
              <img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.TEAM_2.LOGO
                }
                style={{
                  height: "300px",
                }}
              />
            </Transition>,
            <Transition
              trans={this.props.STATE.draftData.HEADER.LEFT_TEAM_TRANSITION}
            >
              <img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.TEAM_1.LOGO
                }
                style={{
                  height: "300px",
                }}
              />
            </Transition>,
          ]}
        />
        <Transition
          trans={this.props.STATE.draftData.HEADER.SEASON_LOGO_TRANSITION}
        >
          <div style={{ marginTop: "125px", textAlign: "center" }}>
            <img
              src={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData.SEASON_LOGO
              }
              style={{
                width: "200px",
              }}
            />
          </div>
        </Transition>
      </_Header_>
    );
  }
}
