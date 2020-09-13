import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { MediaCycler, Particles, Transition } from "arclight-react";

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.3;
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
  render() {
    return (
      <ThemeProvider theme={{}}>
        <Background>
          <MediaCycler
            randomize={true}
            trans={null}
            width={"100%"}
            type={"video"}
            elements={[
              require("./img/ionia.webm"),
              require("./img/targon.webm"),
              require("./img/wukong.mp4"),
            ]}
            interval={15}
            elementTransition={{
              transIn: { animation: "fadeIn", duration: 3 },
              transOut: { animation: "fadeOut", duration: 3 },
            }}
          />
          <Transition
            trans={
              this.props.STATE.team_active > 0
                ? { animation: "fadeIn" }
                : { animation: "fadeOut" }
            }
          >
            <Tint
              team_active={this.props.STATE.team_active}
              last_team_active={this.props.STATE.last_team_active}
              team_1_tint={this.props.STATE.config.BACKGROUND.TEAM1TINT}
              team_2_tint={this.props.STATE.config.BACKGROUND.TEAM2TINT}
            />
          </Transition>
          ,
        </Background>
      </ThemeProvider>
    );
  }
}
