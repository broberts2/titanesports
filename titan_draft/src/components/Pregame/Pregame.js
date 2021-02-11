import React from "react";
import styled from "styled-components";
import { Modal, Particles, Img, Transition } from "arclight-react";

const Pregame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  & img {
    width: 50px;
  }
  overflow: hidden;
  ${(props) => (props.clickable ? "" : "pointer-events: none;")}
  z-index: 20;
`;

const Head = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  & img {
    width: 7vw;
  }
  .sub {
    & img {
      width: 10vw;
    }
  }
`;

const VS = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & img {
    width: 10vw;
  }
`;

const TEAM1 = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  & img {
    width: 35vw;
  }
`;

const TEAM2 = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  & img {
    width: 35vw;
  }
`;

const READY1 = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  font-size: 24px;
  color: blue;
`;

const READY2 = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  font-size: 24px;
  color: red;
`;

const READY = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.div`
  cursor: pointer;
  position: relative;
  width: 50vw;
  height: 50px;
  background-color: ${(props) => (props.team === 1 ? "blue" : "red")};
  border-radius: 5px;
  & .text {
    color: white;
    font-size: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Video = styled.div`
  opacity: 0.15;
  position: absolute;
  width: 100%;
  height: 100%;
  & video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export default class _ extends React.Component {
  state = {
    ready: false,
  };

  render() {
    let mod = 0;
    let modInc = 0.5;
    return (
      <Pregame clickable={!this.props.STATE.draftData.STARTED}>
        <Transition
          trans={{
            animation: this.props.STATE.draftData.STARTED ? "fadeOut" : null,
          }}
        >
          <Video>
            <video
              preload
              loop
              src={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData.PREGAME_VIDEO_BACKGROUND
              }
              autoPlay
              muted
            />
          </Video>
          {this.props.STATE.draftData.TEAM_1.READY ? (
            <Transition
              trans={{
                animation: this.props.STATE.draftData.STARTED
                  ? "fadeOutLeft"
                  : "fadeInLeft",
              }}
            >
              <READY1>Ready</READY1>
            </Transition>
          ) : null}
          {this.props.STATE.draftData.TEAM_2.READY ? (
            <Transition
              trans={{
                animation: this.props.STATE.draftData.STARTED
                  ? "fadeOutRight"
                  : "fadeInRight",
              }}
            >
              <READY2>Ready</READY2>
            </Transition>
          ) : null}
          <Head>
            <Img
              trans={{
                animation: this.props.STATE.draftData.STARTED
                  ? "fadeOutDown"
                  : "fadeInDown",
                delay: (mod += modInc),
              }}
              src={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData.LOGO
              }
            />
            <div className={"sub"}>
              <Img
                trans={{
                  animation: this.props.STATE.draftData.STARTED
                    ? "fadeOutDown"
                    : "fadeInDown",
                  delay: !this.props.STATE.draftData.STARTED
                    ? (mod += modInc)
                    : 0,
                }}
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.SEASON_LOGO
                }
              />
            </div>
          </Head>
          <VS>
            <Img
              trans={{
                animation: this.props.STATE.draftData.STARTED
                  ? "fadeOut"
                  : "fadeIn",
                delay: !this.props.STATE.draftData.STARTED
                  ? (mod += modInc)
                  : 0,
              }}
              src={
                this.props.STATE.ENDPOINT + "/" + this.props.STATE.draftData.VS
              }
            />
          </VS>
          <TEAM1>
            <Img
              trans={{
                animation: this.props.STATE.draftData.STARTED
                  ? "fadeOut"
                  : "fadeIn",
                delay: !this.props.STATE.draftData.STARTED
                  ? (mod += modInc)
                  : 0,
              }}
              src={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData.TEAM_1.LOGO
              }
            />
          </TEAM1>
          <TEAM2>
            <Img
              trans={{
                animation: this.props.STATE.draftData.STARTED
                  ? "fadeOut"
                  : "fadeIn",
                delay: !this.props.STATE.draftData.STARTED ? mod : 0,
              }}
              src={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData.TEAM_2.LOGO
              }
            />
          </TEAM2>
          {this.props.STATE.keyValid &&
          !this.props.STATE.draftData[`TEAM_${this.props.STATE.keyValid}`]
            .READY ? (
            <READY>
              <Transition
                trans={{
                  animation: this.state.ready ? "fadeOutDown" : "fadeInDown",
                  delay: this.state.ready ? 0 : (mod += modInc),
                }}
              >
                <Button
                  team={this.props.STATE.keyValid}
                  onClick={() => {
                    this.setState({ ready: true });
                    this.props.STATE.startDraft();
                  }}
                >
                  <div className={"text"}>Ready</div>
                </Button>
              </Transition>
            </READY>
          ) : null}
        </Transition>
      </Pregame>
    );
  }
}
