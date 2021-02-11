import React from "react";
import styled from "styled-components";
import { Img } from "arclight-react";

const Presentation = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(24, 24, 24);
  transition: all 2s ease;
  ${(props) =>
    props.fadeOut ? "opacity: 0; pointer-events: none;" : "opacity: 1;"}
  & table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    table-layout: fixed;
    width: 100%;
  }
  & img {
    width: 100%;
  }
  z-index: 10;
`;

export default class _ extends React.Component {
  state = {
    loaded: false,
    fadeOut: false,
    unload: false,
    loadNum: 0,
  };

  incLoad() {
    if (++this.state.loadNum >= 4 && !this.state.loaded) {
      this.setState({ loaded: true });
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.STATE.loadPrimary !== newProps.STATE.loadPrimary) {
      this.setState({ unload: true });
      setTimeout(() => this.setState({ fadeOut: true }), 1000);
    }
  }

  render() {
    const delayMod = 0;
    const Img1 = (
      <Img
        onLoad={this.incLoad()}
        trans={
          this.state.loaded
            ? {
                animation: this.state.unload ? "fadeOutLeft" : "fadeInLeft",
                duration: 1.25,
                delay: this.state.unload ? delayMod : 1,
              }
            : null
        }
        src={
          this.props.STATE.ENDPOINT +
          "/" +
          this.props.STATE.draftData.TEAM_1.LOGO
        }
      />
    );
    const Img2 = (
      <Img
        onLoad={this.incLoad()}
        trans={
          this.state.loaded
            ? {
                animation: this.state.unload ? "fadeOutLeft" : "fadeInUp",
                duration: 1.25,
                delay: this.state.unload ? delayMod : 2.5,
              }
            : null
        }
        src={this.props.STATE.ENDPOINT + "/" + this.props.STATE.draftData.VS}
        style={{ width: "35%" }}
      />
    );
    const Img3 = (
      <Img
        onLoad={this.incLoad()}
        trans={
          this.state.loaded
            ? {
                animation: this.state.unload ? "fadeOutRight" : "fadeInDown",
                duration: 1,
                delay: this.state.unload ? delayMod : 3,
              }
            : null
        }
        src={
          this.props.STATE.ENDPOINT +
          "/" +
          this.props.STATE.draftData.SEASON_LOGO
        }
        style={{ width: "35%" }}
      />
    );
    const Img4 = (
      <Img
        onLoad={this.incLoad()}
        trans={
          this.state.loaded
            ? {
                animation: this.state.unload ? "fadeOutRight" : "fadeInRight",
                duration: 1.25,
                delay: this.state.unload ? delayMod : 1,
              }
            : null
        }
        src={
          this.props.STATE.ENDPOINT +
          "/" +
          this.props.STATE.draftData.TEAM_2.LOGO
        }
      />
    );
    return (
      <Presentation fadeOut={this.state.fadeOut}>
        {this.state.loaded ? (
          <table>
            <tbody>
              <tr>
                <td>{Img1}</td>
                <td align={"center"}>
                  {Img2}
                  {Img3}
                </td>
                <td>{Img4}</td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </Presentation>
    );
  }
}
