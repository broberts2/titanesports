import React from "react";
import styled from "styled-components";
import { MediaCycler, Particles, Transition } from "arclight-react";

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: pink;
  overflow: hidden;
  opacity: 0.3;
  z-index: 1;
`;

const calcTint = (at, lta, team_1_tint, team_2_tint) => {
  switch (at) {
    case 0:
      return `background-image: linear-gradient(to ${
        lta === 1 ? "right" : "left"
      }, ${lta === 1 ? team_1_tint : team_2_tint}, rgba(255, 255, 255, 0))`;
    case 1:
      return `background-image: linear-gradient(to right, ${team_1_tint}, rgba(255, 255, 255, 0))`;
    case 2:
      return `background-image: linear-gradient(to left, ${team_2_tint}, rgba(255, 255, 255, 0))`;
  }
};

const Tint = styled.div`
  ${(props) =>
    calcTint(
      props.team_active,
      props.last_team_active,
      props.team_1_tint,
      props.team_2_tint
    )};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
`;

export default class _ extends React.Component {
  componentDidMount() {
    setTimeout(() => this.props.STATE.setLoadPrimary(), 9000);
    this.props.setVideoLoaded();
  }

  render() {
    return (
      <Background>
        <MediaCycler
          randomize={true}
          trans={null}
          type={"video"}
          elements={this.props.STATE.draftData.BACKGROUND.VIDEOS.map(
            (el) => this.props.STATE.ENDPOINT + "/" + el
          )}
          interval={15}
          elementTransition={{
            transIn: { animation: "fadeIn", duration: 3 },
            transOut: { animation: "fadeOut", duration: 3 },
          }}
        />
        <Transition
          trans={
            this.props.STATE.draftData.TEAM_ACTIVE > 0
              ? { animation: "fadeIn" }
              : { animation: "fadeOut" }
          }
        >
          <Tint
            team_active={this.props.STATE.draftData.TEAM_ACTIVE}
            last_team_active={this.props.STATE.last_team_active}
            team_1_tint={this.props.STATE.draftData.BACKGROUND.TEAM1TINT}
            team_2_tint={this.props.STATE.draftData.BACKGROUND.TEAM2TINT}
          />
        </Transition>
      </Background>
    );
  }
}
